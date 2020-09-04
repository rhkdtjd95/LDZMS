package org.traffic.ldms.violation;

import java.io.IOException;

import org.springframework.stereotype.Repository;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

@Repository
public class PoliceMapper {
	public static final MediaType MEDIA_TYPE_JSON = MediaType.get("application/json; charset=utf-8");

	public String select(String msg, String url) throws IOException {
		RequestBody body = RequestBody.create(msg, MEDIA_TYPE_JSON);
		Request request = new Request.Builder().url(url).post(body).build();
		try (Response response = new OkHttpClient().newCall(request).execute()) {
			return response.body().string();
		}
	}
}
