<div id="agentTaging">

{% capture test %}{{ current_user.tags | join: ',' }}{% endcapture %}

</div>
<script>
(function() {

   var tags = '{{ test }}';
   var tagsArray  = tags.split(',');

   var managerRole = $j.inArray("gods", tagsArray)

   if(managerRole != -1){
       $j('#comment_type.say').attr('class', 'say private');
       $j('input#comment_is_public').attr('checked', false);
   }
}());
</script>