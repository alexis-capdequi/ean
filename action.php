<?php

function validateCode ($code) {
    $true_length = [7,12,127];
    $length = strlen((string)$code);
    
    if (!ctype_digit($code) || !in_array($length, $true_length)) {
        return false;
    }
    
    return true;
}

function getKey ($code) {
    $sum = 0;
    $arr = str_split($code);
    $count = count($arr) - 1;
    
    for ($i=0; $i<$count; $i+=2) {
        $sum += $arr[$i];
    }
    for ($i=1; $i<$count; $i+=2) {
        $sum += $arr[$i] * 3;
    }
    
    $key = ($sum % 10);
    if ($key !== 0) {
        $key = 10 - $key;
    }
    
    return $key;
}

/* Récupération et gestion des données soumises */

if (filter_input(INPUT_POST, 'code')) {
    $code = filter_input(INPUT_POST, 'code');
    
    if (validateCode($code)) {
        $key = getKey($code);
    }
}

?>

<!-- Formulaire -->

<form action="action.php" method="POST">
    <input type="text" name="code">
    <input type="submit" value="Valider">
</form>