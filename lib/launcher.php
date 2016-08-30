<?php


function clean($string) {
   $string = str_replace(' ', '-', $string); // Replaces all spaces with hyphens.

   return preg_replace('/[^A-Za-z0-9\-]/', '', $string); // Removes special chars.
}

$collectorCommand = "";
$collector = null;
define("BASE_COMMAND",'bash -c "exec nohup setsid launcher.sh > /dev/null 2>&1 &"');
define("COLLECTOR_PATH",'./collecteurs/collector.js');

$optionsList = array('--ssl-protocol=any',
			'--ignore-ssl-errors=yes',
			/*--log-level=debug'*/
			);
set_time_limit(60);
ini_set( 'max_execution_time',60);
if(isset($_GET["collector"]) && !empty($_GET["collector"]))
{
	$collector = clean($_GET["collector"]);
	$collectorCommand = " --collector=".$collector;
}

if(isset($_GET["debug"]) && !empty($_GET["debug"]))
{
	if(!!$_GET["debug"])
		$collectorCommand .= " --log-level='debug'";
}

$options = "";
foreach($optionsList as $option)
	$options .= " ".$option;

$command = './launcher.sh '.$collector.' > /dev/null &';
if($collector != null)
{
	echo exec($command);
}else
{
	$command .= ' --collector=Aviva';
	$data = system($command);
	$command .= ' --collector=Orange';
	$data .= system($command);
	$command .= ' --collector=Gdfsuez';
	$data .= system($command);
}

