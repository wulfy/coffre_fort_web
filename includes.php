<?php

function clean($string) {
   $string = str_replace(' ', '-', $string); // Replaces all spaces with hyphens.

   return preg_replace('/[^A-Za-z0-9\-]/', '', $string); // Removes special chars.
}

function getDirectoryData(){
	
	$base_dir = getcwd();
$files_dir = 'docs';
//$rootdir    = getcwd() . '/'.$files_dir;
$rootdir    = '/data/'.$files_dir;


ini_get('disable_functions');
$dirData = scandir($rootdir);
$directories=[];
chdir($rootdir);
$query = $_SERVER['PHP_SELF'];
$path = pathinfo( $query );
$baseUrl = $path['dirname'];
$forbiddenDir = ['.','..'];

foreach($dirData as $data)
{	
	if(is_dir($data) && !in_array($data,$forbiddenDir))
	{
		$dir = $data."/";
		chdir($data);
		$directories[$data] = glob("*.pdf");
		chdir($rootdir);
	}
}

$angularData = [];
$directoryData=[];
foreach($directories as $directoryName => $files)
{
	$directoryData["directoryName"] = $directoryName;
	$filesData=[];
	$index=0;
	foreach($files as $fileName)
	{
		$filesData[$index]["name"]=$fileName;
		$filesData[$index]["type"]="pdf";
		$filesData[$index]["url"]= $rootdir."/".$directoryName."/".$fileName;
		$filesData[$index]["img"]="http://www.sft-congres.fr/Images/Public//PAGE__17__122013--347-1.gif";
		
		preg_match("/(0[1-9]|[12][0-9]|3[01])[_](0[1-9]|1[012])[_](19|20)\d\d/", $fileName, $matches);
		$filesData[$index]["date"] = $matches[0];
		$filesData[$index]["timestamp"] = strtotime(str_replace("_","-",$matches[0]));

		$index++;
	}
	$directoryData["files"] = $filesData;
	$angularData[] = $directoryData;
}
chdir($base_dir);

return $angularData;
}

require_once('vendor/smarty/smarty/libs/Smarty.class.php');
$smarty = new Smarty();
