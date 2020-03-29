const MailerTmp = (verifyCode) => `
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title></title>
	</head>
	<body>
		<div style="width:500;background: #fff;border: 3px dashed #ebf5f5;padding:24px;">
			<img height="48" src="https://cdn.nlark.com/yuque/0/2020/png/224470/1584372974199-d4c52a9e-cf88-45c2-898a-a2c41112b120.png"/>
			<h1>确认你的邮件地址</h1>
			<p>在创建 Link Mark 账号之前，你需要完成一个简单的步骤。让我们确保这是正确的邮件地址 — 请确认这是用于你的新账号的正确地址。</p>
			
			<p>请输入此验证码以开始使用 Link Mark：</p>
			<h2>${verifyCode}</h2>
			<p>验证码两小时后过期。</p>
			<br/>
			<p>谢谢！</p>
			<p>Link Mark！</p>
		</div>
	</body>
</html>
`
export default MailerTmp
