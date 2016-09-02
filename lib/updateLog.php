<?php

require_once('includes.php');

$collector = clean($_GET["collector"]);
$config = getJsonConfig();
$log_path = PROJECT_PATH.'/'.$config['root_dir']."/".$config['logs_dir'];
readfile($log_path."/".$collector.".log");
