(function($)
{
    let click = false;
    let end = false;
    let size = 2;
    let color = "black";
    
    // outils
    let crayon = false;
    let ligne = false;
    let gomme = false;
    let polygone = false;

    // coordoonées précédentes
    let xx;
    let yy;

    let polx;
    let poly;

    // positions top et left du canvas
    let top = $('#canvas').offset().top;
    let left = $('#canvas').offset().left;

    let canvas = document.getElementById("canvas"); 
    let ctx = canvas.getContext("2d");
    
    // épaisseur pour tous les outils

    $("#augmenter").click(function ()
    {
        if (size < 900)
        {
            size += 1;
        }
        else
        {
            alert("L'épaisseur maximale du trait est atteinte");
        }
    });

    $("#diminuer").click(function ()
    {
        if (size > 0)
        {
            size -= 1;
        }
        else
        {
            alert("L'épaisseur minimale du trait est atteinte");
        }
    });

    // coordonnées du curseur dans le canvas

    function coordinates (event)
    {
        let x = event.pageX;
        let y = event.pageY;

        $('#canvas').css('cursor', 'cell');

        if (crayon == true)
        {
            pen (x, y);
        }
        else if (ligne == true)
        {
            line (x, y);
        }
        else if (gomme == true)
        {
            eraser (x, y);
        }
        else if (polygone == true)
        {
            lasso (x, y);

            polx = x;
            poly = y;
        }

        xx = x;
        yy = y;
    }

    // OUTIL COULEUR

    $("#couleur").change(function ()
    {
        color = document.getElementById("couleur").value;
    });

    // OUTIL POUBELLE

    $("#poubelle").click(function ()
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // OUTIL FOND

    $("#fond").click(function ()
    {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    });

    // OUTIL GOMME

    function eraser (x, y)
    {
        if (end == true)
        {
            ctx.clearRect(x - left, y - top, 30, 30);
        }
    }

    $("#gomme").mousedown(function ()
    {
        gomme = true;
        crayon = false;
        ligne = false;
        polygone = false;

        $("#canvas").mousedown(function (event)
        {
            if (gomme == true)
            {
                click = true;
                end = false;
                coordinates(event);
            }
        });

        $("#canvas").mousemove(function (event)
        {
            if (click == true && gomme == true)
            {
                end = true;
                coordinates(event);
            }
        });
        
        $("#canvas").mouseup(function ()
        {
            if (click == true && gomme == true)
            {
                click = false;
            }
        });

        $("#canvas").mouseleave(function ()
        {
            click = false;
        });
    });

    // OUTIL CRAYON

    function pen (x, y)
    {
        if (end == true)
        {
            ctx.lineWidth = size;
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.moveTo(xx - left, yy - top);
            ctx.lineTo(x - left, y - top);
            ctx.stroke();
            ctx.closePath();
        }
    }

    $("#crayon").mousedown(function ()
    {
        crayon = true;
        ligne = false;
        gomme = false;
        polygone = false;

        $("#canvas").mousedown(function (event)
        {
            if (crayon == true)
            {
                click = true;
                end = false;
                coordinates(event);
            }
        });

        $("#canvas").mousemove(function (event)
        {
            if (click == true && crayon == true)
            {
                end = true;
                coordinates(event);
            }
        });
        
        $("#canvas").mouseup(function ()
        {
            if (click == true && crayon == true)
            {
                click = false;
            }
        });

        $("#canvas").mouseleave(function ()
        {
            click = false;
        });
    });

    // OUTIL LIGNE

    function line (x, y)
    {
        if (end == true)
        {
            ctx.lineWidth = size;
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.moveTo(xx - left, yy - top);
            ctx.lineTo(x - left, y - top);
            ctx.stroke();
            ctx.closePath();
        }
    }

    $("#ligne").mousedown(function ()
    {
        ligne = true;
        crayon = false;
        gomme = false;
        polygone = false;

        $("#canvas").mousedown(function (event)
        {
            if (ligne == true)
            {
                click = true;
                end = false;
                coordinates(event);
            }
        });

        $("#canvas").mouseup(function ()
        {
            if (click == true && ligne == true)
            {
                end = true;
                coordinates(event);
            }
        });

        $("#canvas").mouseleave(function ()
        {
            click = false;
        });
    });

    // OUTIL LASSO

    function lasso (x, y)
    {
        if (end == true)
        {
            ctx.lineWidth = size;
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.moveTo(polx - left, poly - top);
            ctx.lineTo(x - left, y - top);
            ctx.stroke();
        }
    }

    $("#polygone").mousedown(function ()
    {
        polygone = true;
        crayon = false;
        gomme = false;
        ligne = false;

        $("#canvas").mousedown(function (event)
        {
            if (polygone == true)
            {
                click = true;
                end = true;
                coordinates(event);
            }
        });

        $("#canvas").mouseup(function ()
        {
            if (polygone == true)
            {
                click = false;
            }
        });

        $("#canvas").mouseleave(function ()
        {
            click = false;
        });
    });

    // OUTIL SAUVEGARDE

    $("#sauvegarde").click(function ()
    {
        let save = canvas.toDataURL('image/png');
        document.location.href = save.replace("image/png", "image/octet-stream");
        // valeur du fichier au format binaire (permet d'envoyer une partie du document au navigateur)
    });
})(jQuery);