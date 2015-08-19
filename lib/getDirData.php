<?php

require_once('../includes.php');
$angularData = getDirectoryData();
echo json_encode($angularData);