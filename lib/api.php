<?php

require_once('includes.php');
$base_dir = getcwd();
$files_dir = 'docs';
$rootdir    = getcwd() . '/'.$files_dir;
ini_get('disable_functions');
$dirData = scandir($rootdir);
$directories=[];
chdir($rootdir);
$query = $_SERVER['PHP_SELF'];
$path = pathinfo( $query );
$baseUrl = $path['dirname'];

if(isset($_GET["directory"])) 
{
	$directory = clean($_GET["directory"]);
	$dir = $rootdir.'/'.$directory;
	chdir($dir);
	$files  = glob("*.pdf");

	$angularData = [];
	$directoryData=[];
	$directoryData["directoryName"] = $directory;
	$filesData=[];
	$index=0;
	foreach($files as $fileName)
	{
		$filesData[$index]["name"]=$fileName;
		$filesData[$index]["type"]="pdf";
		$filesData[$index]["url"]= $files_dir."/".$directoryName."/".$fileName;
		$filesData[$index]["img"]="http://www.sft-congres.fr/Images/Public//PAGE__17__122013--347-1.gif";
		
		preg_match("/(0[1-9]|[12][0-9]|3[01])[_](0[1-9]|1[012])[_](19|20)\d\d/", $fileName, $matches);
		$filesData[$index]["date"] = $matches[0];
		$filesData[$index]["timestamp"] = strtotime(str_replace("_","-",$matches[0]));

		$index++;
	}
	$directoryData["files"] = $filesData;
	$angularData[] = $directoryData;
}

echo(json_encode($angularData));