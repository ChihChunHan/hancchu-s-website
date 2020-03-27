<?php
$data = [];

// workCoverData陣列

function scan1($index)
{
    $index = scandir("images/" . $index, 1);
    for ($i = 0; $i < count($index); $i++) {
        if($index[$i]=='.'||$index[$i]=='..'||$index[$i]=='.DS_Store') continue;
        $array[] =  'images/cover/' . $index[$i];
    }
    return $array;
}

$workCoverData = scan1('cover');

// worksListData陣列

// 取得文字檔案
$json_string = file_get_contents("workTextContent.json");
$textData = json_decode($json_string, true);
$textAryCount=0;
// print_r($textData);

function scan2($index)
{
    $finder = $index;
    $index = scandir("images/" . $index, 1);
    print_r($index);
    $num = count($index)-4;
    for ($i = 0; $i < count($index); $i++) {
        // 生成陣列
        if($index[$i]=='.'||$index[$i]=='..'||$index[$i]=='.DS_Store'||$index[$i]==$finder.'_content') continue;
        $array[$i-1]['id_cover'] =  'images/'.$finder.'/' . $index[$i];
        $array[$i-1]['title'] = $GLOBALS['textData'][$GLOBALS['textAryCount']][$num-$i]['title'];    
        $array[$i-1]['tags'] = $GLOBALS['textData'][$GLOBALS['textAryCount']][$num-$i]['tags']; 
        $array[$i-1]['year'] = $GLOBALS['textData'][$GLOBALS['textAryCount']][$num-$i]['year'];
    }
    $idcount = scandir('images/' . $finder .'/'.$finder.'_content', 1);
    for ($i=0; $i < count($idcount); $i++) { 
        if($idcount[$i]=='.'||$idcount[$i]=='..'||$idcount[$i]=='.DS_Store') continue;
        $workimg = scandir('images/' . $finder .'/'.$finder.'_content/'.$idcount[$i], 1);
        print_r($idcount[$i]);
        for ($j=0; $j < count($workimg); $j++) { 
            if($workimg[$j]=='.'||$workimg[$j]=='..'||$workimg[$j]=='.DS_Store') continue;
            $array[$i]['imgs'][] = 'images/' . $finder .'/'.$finder.'_content/'.$idcount[$i].'/'.$workimg[$j];
        }
    }
    $GLOBALS['textAryCount']++;
    return $array;
}

$worksListData = [
    'WebFrontendDesign' => [],
    'WebLayout' => [],
    '3DModlerender' => [],
    'EDMparty' => [],
    'KeyVisual' => [],
    'Concert' => [],
];

$worksListData['WebFrontendDesign'] = scan2('web');
$worksListData['WebLayout'] = scan2('web-layout');
$worksListData['3DModlerender'] = scan2('3d');
$worksListData['EDMparty'] = scan2('edm');
$worksListData['KeyVisual'] = scan2('KV');
$worksListData['Concert'] = scan2('concert');

// print_r($worksListData['3DModlerender']);



$data = ['workCoverData'=>$workCoverData,'worksListData'=>$worksListData];
// print_r($data);

$newjson = json_encode($data,JSON_UNESCAPED_UNICODE);
$creatf = fopen('worksData.json','w ');
fwrite($creatf,$newjson);




?>