<?php
require "./../.env";

header("Access-Control-Allow-Origin: *");

header("Content-Type: application/json; charset=UTF-8");

header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");

header("Access-Control-Max-Age: 3600");

header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

function serverConnect()
{
  $servername = "localhost:3306";
  $username = "root";
  $password = getenv("PASSWORD");

  try {
    $conn = new PDO("mysql:host=$servername;dbname=pipper", $username, $password);
    // set the PDO error mode to exception

    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $conn;
  } catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
  }
}

$requestType = $_SERVER["REQUEST_METHOD"];


if ($requestType == "GET") {
  $conn = serverConnect();
  $statement = $conn->query("select * from user_pips");
  $result = $statement->fetchAll();

  echo json_encode($result);
} elseif ($requestType == "POST") {
  $conn = serverConnect();
  $input = (array) json_decode(file_get_contents("php://input"), TRUE);
  echo $input["username"];

  $statement = "INSERT INTO pipper.user_pips (username, pip) VALUES (:username, :pip)";

  try {
    $statement = $conn->prepare($statement);
    $statement->execute(array("username" => $input['username'], "pip" => $input['pip']));
  } catch (PDOException $e) {
    echo "beksed kan ikke sendes: " . $e->getMessage();
  }

  echo $input["username"];
}
