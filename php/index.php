<?php
    use \Psr\Http\Message\ServerRequestInterface as Request;
    use \Psr\Http\Message\ResponseInterface as Response;

    require 'vendor/autoload.php';
    require 'Clases/Personas.php';

    $app = new \Slim\App;

    //http://localhost:8080/PPS/index.php/personas    
    $app->get('/personas', function ($req, $res, $args) {
        
        return $res
           ->withHeader('Content-type', 'application/json')
           ->getBody()
           ->write(
            json_encode(
                Persona::TraerTodasLasPersonas()
            )
        );        
    });
    
    //http://localhost:8080/PPS/index.php/persona/borrar/3
    $app->get('/persona/borrar', function ($req, $res, $args) {        
        return $res
           ->withHeader('Content-type', 'application/json')
           ->getBody()
           ->write(
            json_encode(
                Persona::BorrarPersona($req->getParam('id'))
            )
        );
    });

    //http://localhost:8080/PPS/index.php/persona/guardar?nombre=Juan&apellido=Pedro&dni=1515
    $app->get('/persona/guardar', function ($req, $res) {
        $perConst = new Persona();
        $perConst->SetNombre($req->getParam('nombre'));
        $perConst->SetApellido($req->getParam('apellido'));
        $perConst->SetDni($req->getParam('dni'));
        $perConst->SetFoto($req->getParam('foto'));
        $perConst->SetSexo($req->getParam('sexo'));
        $perConst->SetPassword($req->getParam('password'));
        
        return $res
           ->withHeader('Content-type', 'application/json')
           ->getBody()
           ->write(
            json_encode(
                Persona::InsertarPersona($perConst)
            )
        );
    });

    //http://localhost:8080/PPS/index.php/persona/modificar?id=5&nombre=Julio&apellido=Pedro
    $app->put('/persona/modificar', function ($req, $res) {
        $perConst = new Persona();
        $perConst->SetId($req->getParam('id'));
        $perConst->SetNombre($req->getParam('nombre'));
        $perConst->SetApellido($req->getParam('apellido'));
        
        return $res
           ->withHeader('Content-type', 'application/json')
           ->getBody()
           ->write(
            json_encode(
                Persona::ModificarPersona($perConst)
            )
        );
    });

    $app->run();