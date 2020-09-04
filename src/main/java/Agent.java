import java.io.IOException;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class Agent {
	public static final MediaType MEDIA_TYPE_HTML = MediaType.get("tex/html; charset=utf-8");

	private String post(String url, String msg) throws IOException {
		RequestBody body = RequestBody.create(msg, MEDIA_TYPE_HTML);
		
		Request request = new Request.Builder().url(url).post(body).build();
		try (Response response = new OkHttpClient().newCall(request).execute()) {
			return response.body().string();
		}
	}
	
	public static void main(String[] args) throws IOException {
		Agent agent = new Agent();
		String response = agent.post("http://192.168.0.2:8080/police/service/vehicle?accessKey=1234567890&no=12가3356","");
	}
}
