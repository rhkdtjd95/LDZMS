package org.traffic.ldms.violation;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.traffic.ldms.parking.Parking;
import org.traffic.ldms.parking.ParkingMapper;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.Headers;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.ResponseBody;

@Service
public class ViolationServiceImpl implements ViolationService {
	/* private static final String POLICE_API_IP = "http://192.168.0.10:8080"; */

	@Autowired
	private ViolationMapper violationMapper;

	@Autowired
	private PoliceMapper policeMapper;

	@Autowired
	private ParkingMapper parkingMapper;

	private final OkHttpClient client = new OkHttpClient();

	public void run(Parking parking) throws Exception {
		Request request = new Request.Builder()
				.url("http://" + parking.getIp() + ":84/alert?locationNo=" + parking.getLocationNo()).build();

		System.out.println("---->" + "http://" + parking.getIp() + ":84/alert?locationNo=" + parking.getLocationNo());
		client.newCall(request).enqueue(new Callback() {

			@Override
			public void onFailure(Call call, IOException e) {
				e.printStackTrace();
			}

			@Override
			public void onResponse(Call call, Response response) throws IOException {
				try (ResponseBody responseBody = response.body()) {
					System.out.println(responseBody.string());
				}
			}
		});
	}

	@Override
	public void addInfo(String no, String locationNo,Violation violation) {
		String jsonResponse = null;
		try {
			jsonResponse = policeMapper.select("",
					"http://localhost:82/police/service/vehicle?accessKey=12523523&no=" + no);
		} catch (IOException e) {
			e.printStackTrace();
		}

		JsonParser jsonParser = new JsonParser();
		JsonElement jsonElement = jsonParser.parse(jsonResponse);

		Violation violations = new Gson().fromJson(jsonElement.getAsJsonObject().get("vehicle"), Violation.class);
		int count = this.violationMapper.select(no);

		boolean isAlert = false;
		if (count > 0) {
			this.violationMapper.update(no);

			isAlert = true;
		} else {
			if (violations.getCc() > 1000) {
				this.violationMapper.insert(violations);
				isAlert = true;
			}
		}

		if (isAlert) {
			Parking parking = this.parkingMapper.select(locationNo);

			try {
				run(parking);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	@Override
	public Violation selectVioInfo(String no) {
		return this.violationMapper.selectViolation(no);
	}

	/* @Scheduled(cron ="0 0 24 ? * *") */
	@Scheduled(fixedRate = 1000 * 60 * 60 * 24)
	public void removeViolationInfo() {
		this.violationMapper.deleteBySchedule();
	}
}
