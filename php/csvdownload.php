<?php


$xmlDoc = new DOMDocument();
$encodedMessage = file_get_contents("php://input");
$xmlDoc->loadXML($encodedMessage);
$url = $xmlDoc->getElementsByTagName("url")->item(0)->nodeValue;
//the GoodData url for the zendesk data source for your account
$goodDataurl = 'https://secure.gooddata.com/gdc/connectors/zendesk/fetchdata?p=fd483ea6789e1a5ba6d38ce150f90785d4dc3837';
//$username = '';
//$password = '';
$csvName = parse_url($url, PHP_URL_PATH);
$csvNamePath = explode('/', $csvName);
$pathCSVsize = sizeof($csvNamePath)-1;
$csvFileName = $csvNamePath[$pathCSVsize];

//fire the function downloading the csv to local server
transport($url, $csvFileName);
//fire the function to send the location of the datasource to GoodData
goodData($encodedMessage, $goodDataurl);

       //the fucntion to send the location of the data source to GoodData
       function goodData($encodedMessage, $goodDataurl )
        {
                $headers = array('Content-type: application/xml','Content-Length: ' . strlen($encodedMessage));

                $cobj = curl_init();
                curl_setopt($cobj, CURLOPT_SSL_VERIFYPEER, FALSE);
                curl_setopt($cobj, CURLOPT_RETURNTRANSFER,1);
                //curl_setopt($cobj, CURLOPT_USERPWD, $username .":".$password);
                curl_setopt($cobj, CURLOPT_URL, $goodDataurl);
                curl_setopt($cobj, CURLOPT_POST, 1);
                curl_setopt($cobj, CURLOPT_HTTPHEADER, $headers);
                curl_setopt($cobj, CURLOPT_POSTFIELDS, $encodedMessage);
                curl_setopt($cobj, CURLOPT_FOLLOWLOCATION, false);
                curl_setopt($cobj, CURLOPT_HEADER, true);

                $last_http_result = curl_exec($cobj);
                $last_error       = curl_error($cobj);
                $last_http_code   = curl_getinfo($cobj ,CURLINFO_HTTP_CODE);

                curl_close($cobj);

                print $last_http_result."\n";
                print $last_error."\n";
                print $last_http_code."\n";

        }
        //the functions to download the zip file to local server 
        function transport($url, $csvFileName)
        {       
                
              

                $headers = array('Content-type: application/zip');
                $cobj = curl_init();
                $csvContent = fopen($csvFileName,'w');
                curl_setopt($cobj, CURLOPT_SSL_VERIFYPEER, FALSE);
                //curl_setopt($cobj, CURLOPT_RETURNTRANSFER,1);
                //curl_setopt($cobj, CURLOPT_USERPWD, $username .":".$password);
                curl_setopt($cobj, CURLOPT_URL, $url);
                curl_setopt($cobj, CURLOPT_HTTPHEADER, $headers);
                curl_setopt($cobj, CURLOPT_FOLLOWLOCATION, false);
                //curl_setopt($cobj, CURLOPT_HEADER, true);
                curl_setopt($cobj, CURLOPT_FILE, $csvContent);
                //$last_http_result = curl_exec($cobj);
                //$last_error       = curl_error($cobj);
                //$last_http_code   = curl_getinfo($cobj ,CURLINFO_HTTP_CODE);
				
				
                curl_exec($cobj);
                curl_close($cobj);
                
                unzipZendeskCSV($csvFileName);

        }
        //the funciton to unzip and save cvs locally 
	function unzipZendeskCSV($reportName)
        {     
              $unzipReport = new ZipArchive;
              $unzipReport->open($reportName);
              $unzipReport->extractTo('/var/www/reports/');
              $unzipReport->close();
        }

exit;

?>
