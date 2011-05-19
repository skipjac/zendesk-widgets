$j(document).ready(function()

{
  //hide the all of the element with class category
  $j(".category").hide();
  //toggle the componenet with class category
  $j(".category-header").click(function()
  {
    $j(this).next(".category").slideToggle(600);
  });
});
