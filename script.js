function auto_reply() {
	//自動返信メールの件名
	var title = "【お申込みありがとうございます（自動返信）】"; 

	//自動返信メールの本文1(\nは改行)
	var body
	= "この度はシシヤマザキ 個展「“舕 TOUNGUE”」オープニングレセプションへお申し込みいただきまして、誠にありがとうございます。\n"
	+ "お申込みいただいた内容は次の通りです。\n"
	+ "------------------------------------------------------------\n\n"

	//自動返信メールの本文2(\nは改行)
	var body2
	= "------------------------------------------------------------\n\n"
    + "株式会社HOTZIPANG\n"
    + "03-6303-0254\n"
    + "153-0051\n"
    + "東京都目黒区上目黒2-9-35　中目黒GS第二ビル B1F\n"
    + "2-9-35 B1F Kamimeguro, Meguro-ku, Tokyo Japan , 153-0051\n"
    + "本メールに心当たりが無い場合は、その旨を記載の上ご返信下さいますようお願い申し上げます。\n\n";


 	//本文作成用の変数
	var sheet = SpreadsheetApp.getActiveSheet();
	var row = sheet.getLastRow();
	var column = sheet.getLastColumn();
	var range = sheet.getDataRange();

	//メールアドレス保存用の変数(最後のメール送信時に使用。)
	var  mail = "";

	for (var i = 1; i <= column; i++ ) {
		//スプレッドシートの入力項目名を取得
		var header = range.getCell(1, i).getValue(); 
		//スプレッドシートの入力値を取得
		var value = range.getCell(row, i).getValue();

		//本文1(body)にスプレッドシートの入力項目を追加
		body += header+"\n";

		//本文1(body)にフォームの入力内容を追加
		body += value + "\n\n";

		//スプレッドシートの入力項目が「お名前」の場合は、「様」を付け本文の前に追加
		if ( header === '【2/6】お名前（漢字）' ) {
            body = value+" 様\n\n"+body;
        }

		//フォームの入力項目が「メールアドレス」の場合は、変数mailに代入
        if ( header === '【5/6】メールアドレス' ) {
            mail = value;
        }
    }
 	//本文1に本文2を追加
	body += body2;

	//宛名＝mail、件名＝title、本文=bodyで、メールを送る
	GmailApp.sendEmail(mail,title,body);
}