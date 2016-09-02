<?php
define("PROJECT_PATH", realpath(dirname(__FILE__)).'/..');

require_once(PROJECT_PATH.'/vendor/smarty/smarty/libs/Smarty.class.php');

/*
*
*/
function clean($string) {
   $string = str_replace(' ', '-', $string); // Replaces all spaces with hyphens.

   return preg_replace('/[^A-Za-z0-9\-]/', '', $string); // Removes special chars.
}

/*
*
*/
function getJsonConfig(){
	$string = file_get_contents(PROJECT_PATH."/collecteurs/config.json");
	$json_a = json_decode($string, true);
	
	return $json_a;
}

/*
*
*/
function getDirectoryData(){
$base_dir = getcwd();
$config = getJsonConfig();

$files_dir = $config['files_dir'];
$rootdir    = PROJECT_PATH.'/'.$config['root_dir'].'/'.$files_dir;


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
		$dir = $data.'/';
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
		$filesData[$index]["url"]= "./".$config['root_dir'].'/'.$files_dir."/".$directoryName.'/'.$fileName;
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

$smarty = new Smarty();
