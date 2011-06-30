  <style>
    tr.linked.row
    {
     background-color:#6AFA9A !important;
    }    
    tr.linked.rowend
    {
    background-color:#A8C5FF !important;
    }
    tr.linked:hover
    {
    background-color:#D8D8D8 important; 
    }


    </style>
   
    <script language="text/javascript">
	$(document).observe('widgets:load', function(){ 
        $j(document).ready(function() {           
            $j('.tickets td:contains(Need to Investigate)').parent().addClass('row');
            $j('.tickets td:contains(User)').parent().addClass('rowend');
            $j('.tickets td.description:contains(User)').parent().removeClass('rowend');
        });
    });
    </script>
