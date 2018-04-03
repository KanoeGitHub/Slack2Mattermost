function doPost(e) {
	var t = e.parameter.token;

	//webhookトークン確認
	if( t != "[slack WebHook Token]")
	{return;}  

	 var chName = e.parameter.channel_name;
	 var userName = e.parameter.user_name;
	 
//ssdコード参考に追加---------
	var user_options = {
	 "method" : "post",
			"payload" : {
				"token" : "[slack API Token]",
				"user" : e.parameter.user_id,
			}
		};
		var response = UrlFetchApp.fetch("https://slack.com/api/users.info", user_options);
		var json = JSON.parse(response.getContentText());
//-------------------------
	
	var name = json["user"]["real_name"];
	var image = json["user"]["profile"]["image_24"]
	var msg = "チャンネル名：" + chName + "\n内容 : "+ e.parameter.text ;
	
	var payload = {
			"text" : "Slackから転送\n" + msg,
		        "icon_url" : image, 
			"username" : name, 
		}
		
	postMmost(payload);
}

function postMmost(payload)
{
	var options = {
		"method" : "POST",
		"contentType" : "application/json", // ※Mattermost用
		"payload" : JSON.stringify(payload)
	}

	var url = "[MatterMost Incoming Webhook URL]"; 
	var response = UrlFetchApp.fetch(url, options);
	var content = response.getContentText("UTF-8");

}
