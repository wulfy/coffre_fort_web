<?php

require_once('includes.php');


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
$config = getJsonConfig();
$logfilename = $collector.".log";
if($collector != null)
{
	$log_path = PROJECT_PATH.'/'.$config['root_dir']."/".$config['logs_dir'];

	//re-generate log each time
	$create_file = 'touch '.$log_path.'/'.$logfilename;
	$give_access = 'chmod 777 '.$log_path.'/'.$logfilename;

	//call casper command
	$casperjs_command = 'casperjs --ssl-protocol=any --ignore-ssl-errors=yes --web-security=no ../collecteurs/collector.js --collector='.$collector.' > '.$log_path.'/'.$logfilename;
	//#casperjs --ssl-protocol=any --ignore-ssl-errors=yes ./collecteurs/collector.js --collector=$1 > logs/$1.log 
	//end of job notification for Angular
	$end_of_job = 'echo "#END#" >> '.$log_path.'/'.$logfilename;
	
	echo exec($create_file);
	echo exec($give_access);
	echo $casperjs_command;
	echo exec($casperjs_command);
	echo exec($end_of_job);
}else
{
	$command .= ' --collector=Aviva';
	$data = system($command);
	$command .= ' --collector=Orange';
	$data .= system($command);
	$command .= ' --collector=Gdfsuez';
	$data .= system($command);
}

