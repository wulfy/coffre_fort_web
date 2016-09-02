<?php

require_once('includes.php');

$config = getJsonConfig();
$docdir = PROJECT_PATH."/".$config['root_dir'].'/'.$config['files_dir'];
$screensdir = PROJECT_PATH."/".$config['root_dir'].'/'.$config['files_dir'];
$logsdir = PROJECT_PATH."/".$config['root_dir'].'/'.$config['logs_dir'];

$create_folders = 'mkdir -p '.$docdir.'/Orange;
mkdir -p '.$docdir.'/Aviva;
mkdir -p '.$docdir.'/Gdfsuez;
mkdir -p '.$docdir.'/Sosh;
mkdir -p '.$docdir.'/Edf;
mkdir -p '.$screensdir.';
mkdir -p '.$logsdir;


$give_access = 'chmod -R 755 '.$config['root_dir'];

echo shell_exec($create_folders);
echo "create folders -- ok <br/>";

echo shell_exec($give_access);
echo "give access -- ok";
