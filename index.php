<?php
error_reporting(E_ALL);
require_once('lib/includes.php');
$angularData = getDirectoryData();

$smarty->left_delimiter = '<!--{';
$smarty->right_delimiter = '}-->';
$smarty->assign('angularData',json_encode($angularData));
$smarty->display('web/view/list.tpl');
