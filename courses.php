<!DOCTYPE html>
<html>
<head>
    <title>Course list</title>
    <meta charset="utf-8" />
    <link href="courses.css" type="text/css" rel="stylesheet" />
</head>
<body>
<div id="header">
    <h1>Courses at CSE</h1>
<!-- Ex. 1: File of Courses -->
    <?
    $filename = "courses.tsv";
    $lines = file("$filename");
    $count = count($lines); ?>
    <p>
        Course list has 9 total courses
        and
        size of 270 bytes.
    </p>
</div>
<div class="article">
    <div class="section">
        <h2>Today's Courses</h2>
<!-- Ex. 2: Today’s Courses & Ex 6: Query Parameters -->
        <?php
            $numberOfCourses = $_GET["numberOfCourses"];
            function getCoursesByNumber($listOfCourses, $numberOfCourses){
                $resultArray = array();
            for($i = 0;$i < $numberOfCourses;$i++){
                    $resultArray[$i] = $listOfCourses[$i]; 
                    $resultArray[$i] = explode("\t", $resultArray[$i]);
                    $resultArray[$i] = implode("-", $resultArray[$i]);
                }
                shuffle($resultArray);
//                implement here.
                return $resultArray;
            }
        ?>
        <ol>
            <?foreach(getCoursesByNumber($lines,$numberOfCourses) as $todaysCourses) { ?>
                <li><? print "$todaysCourses\n";?></li>
            <?}?>
        </ol>
    </div>
    <div class="section">
        <? $startCharacter = $_GET["startCharacter"]?>
        <h2>Searching Courses</h2>
<!-- Ex. 3: Searching Courses & Ex 6: Query Parameters -->
        <?
            function getCoursesByCharacter($listOfCourses, $startCharacter){
                $resultArray = array();
                $resultArray2 = array();
                for($i = 0;$i < 9;$i++){
                    $resultArray[$i] = $listOfCourses[$i]; 
                    $resultArray[$i] = explode("\t", $resultArray[$i]);
                    $resultArray[$i] = implode("-", $resultArray[$i]);
                    if(substr($resultArray[$i],0,1) == "$startCharacter"){
                        array_push($resultArray2,$resultArray[$i]);
                    }
                }               
//                implement here.
                return $resultArray2;
            }
        ?>
        <p>
            Courses that started by <strong>'C'</strong> are followings :
        </p>
        <ol>
            <?foreach(getCoursesByCharacter($lines,$startCharacter) as $searchedCourses) { ?>
                <li><?=$searchedCourses?></li>
            <?}?>
        </ol>
    </div>
    <div class="section">
        <h2>List of Courses</h2>
<!-- Ex. 4: List of Courses & Ex 6: Query Parameters -->
        <?
        $orderby = $_GET["orderby"];
            function getCoursesByOrder($listOfCourses, $orderby){
                $resultArray = $listOfCourses;
//                implement here.
                for($i=0;$i<9;$i++){
                    $resultArray[$i] = $listOfCourses[$i]; 
                    $resultArray[$i] = explode("\t", $resultArray[$i]);
                    $resultArray[$i] = implode("-", $resultArray[$i]);
                }
                if($orderby = 1){
                    sort($resultArray);
                }
                elseif ($orderby = 0) {
                    rsort($resultArray);
                }
                return $resultArray;
            }
        ?>
        <p>
            All of courses ordered by <strong>alphabetical order</strong> are followings :
        </p>
        <ol>
            <? $orderedCourses2 = getCoursesByOrder($lines,$orderby); ?>
            <? foreach($orderedCourses2 as $orderedCourses) { ?>
            <? $output = array();
               $output = explode("-", $orderedCourses); ?>
                <li <? if(strlen($output[0]) > 20){?>
                    class="long">
                <?=$orderedCourses?></li><?}?> <?}?>
        </ol>
    </div>
    <div class="section">
        <h2>Adding Courses</h2>
<!-- Ex. 5: Adding Courses & Ex 6: Query Parameters -->
        <p>Input course or code of the course doesn't exist.</p>
    </div>
</div>
<div id="footer">
    <a href="http://validator.w3.org/check/referer">
        <img src="http://selab.hanyang.ac.kr/courses/cse326/2015/problems/images/w3c-html.png" alt="Valid HTML5" />
    </a>
    <a href="http://jigsaw.w3.org/css-validator/check/referer">
        <img src="http://selab.hanyang.ac.kr/courses/cse326/2015/problems/images/w3c-css.png" alt="Valid CSS" />
    </a>
</div>
</body>
</html>
