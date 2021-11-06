		String.prototype.tpl = function(o) { 
			var r = this ; 
			for (var i in o) { 
				r = r.replace(new RegExp("\\$"+i, 'g'),o[i])  
			} 
			return r 
		}
		
		var listItemTpl_a = `<li><a class="dropdown-item" href='#' onclick='custom_load_a("$url")'>$label</a></li>`
		var listItemTpl_b = `<li><a class="dropdown-item" href='#' onclick='custom_load_b("$url")'>$label</a></li>`
		var listItemTpl_c = `<li><a class="dropdown-item" href='#' onclick='custom_load_c("$url")'>$label</a></li>`
		
		$(document).ready(main);

		function main() {
			$.ajax({
				method: 'GET',
				url: '../js/museum_filelist.json',
				success: function(d) {
					for (var i=0; i<d.length; i++) {
						$('#list_a').append(listItemTpl_a.tpl({url:d[i].url, label: d[i].label}))
					}
					for (var i=0; i<d.length; i++) {
						$('#list_b').append(listItemTpl_b.tpl({url:d[i].url, label: d[i].label}))
					}
					for (var i=0; i<d.length; i++) {
						$('#list_c').append(listItemTpl_c.tpl({url:d[i].url, label: d[i].label}))
					}	
				},
				error: function() {
					alert('No document to show')
				}
			});
			
			$('#see_mention').click(function() {
				if (this.checked) 
					$('#metadata_panels').show()
				else
					$('#metadata_panels').hide()
			});
			
			$('#clear_highlights').click(function() {
				if (this.checked) 
					$('.mention-person').removeClass('text-person')
					$('.mention-place').removeClass('text-place')
					$('.mention-organisation').removeClass('text-organisation')
					$('.mention-concept').removeClass('text-concept')
			});
			
		}
		
		//custom_load per spazio articolo 1
		function custom_load_a(file) {
			$.ajax({
				method: 'GET',
				url: file,
				success: function(d) {
					$('#article_1').html(d)
					$('#title').html($('#article_1 h1'))
					$('.show').prop("checked", false)
					filltabs_a()
				},
				error: function() {
					alert('Could not load file '+file)
				}
			});
		}
		
		//custom_load per spazio articolo 2
		function custom_load_b(file) {
			$.ajax({
				method: 'GET',
				url: file,
				success: function(d) {
					$('#article_2').html(d)
					$('#title').html($('#article_2 h1'))
					$('.show').prop("checked", false)
					filltabs_b()
				},
				error: function() {
					alert('Could not load file '+file)
				}
			});
		}
		
		//custom_load per spazio articolo 3
		function custom_load_c(file) {
			$.ajax({
				method: 'GET',
				url: file,
				success: function(d) {
					$('#article_3').html(d)
					$('#title').html($('#article_3 h1'))
					$('.show').prop("checked", false)
					filltabs_c()
				},
				error: function() {
					alert('Could not load file '+file)
				}
			});
		}
		
		function filltabs_a(){
			filltab_a("#article_1 .mention-person","list-person","#person_a")
			filltab_a("#article_1 .mention-place","list-place","#place_a")
			filltab_a("#article_1 .mention-concept","list-concept","#concept_a")
			filltab_a("#article_1 .mention-organisation","list-organisation","#organisation_a")
			filltab_a("#article_1 .mention-tool","list-tool","#tool_a")
		}
		
		function filltabs_b(){
			filltab_b("#article_2 .mention-person","list-person","#person_b")
			filltab_b("#article_2 .mention-place","list-place","#place_b")
			filltab_b("#article_2 .mention-concept","list-concept","#concept")
			filltab_b("#article_2 .mention-organisation","list-organisation","#organisation_b")
			filltab_b("#article_2 .mention-tool","list-tool","#tool_b")
		}
			
		function filltabs_c(){	
			filltab_c("#article_3 .mention-person","list-person","#person_c")
			filltab_c("#article_3 .mention-place","list-place","#place_c")
			filltab_c("#article_3 .mention-concept","list-concept","#concept_c")
			filltab_c("#article_3 .mention-organisation","list-organisation","#organisation_c")
			filltab_c("#article_3 .mention-tool","list-tool","#tool_c")
		}
		
		function filltab_a(what,style,where) {
			var list = `<li class="list $style"><a href="#" onclick="goto_a('$place')">$content</a></li>`
			var elements = $(what); 
			$(where+' ul').empty(); 
			$.each($(what), function(i, metadataItem){
				$(where+' ul').append(list.tpl({
					style:style, 
					place: '#'+elements[i].id,
					content: elements[i].innerHTML
				}) )
			});
			//highlights
			$('#person-tab_a').click(function(){
				$('#article_1 .mention-person').addClass('text-person')
				$("#clear_highlights").prop("checked", false);
			});
			
			//highlights
			$('#place-tab_a').click(function(){
				$('#article_1 .mention-place').addClass('text-place')
				$("#clear_highlights").prop("checked", false);
			});
				
			//highlights
			$('#organisation-tab_a').click(function(){
				$('#article_1 .mention-organisation').addClass('text-organisation')
				$("#clear_highlights").prop("checked", false);
			});
			
			//highlights
			$('#concept-tab_a').click(function(){
				$('#article_1 .mention-concept').addClass('text-concept')
				$("#clear_highlights").prop("checked", false);

			});
		}
		
		function goto_a(id) {
			 $([document.documentElement, document.body]).animate({
              scrollTop: $('#article_1').offset().top
				}, 100);
			$(id).addClass('animate');
				setTimeout(function(){
					$(id).removeClass('animate');
				},5000);
		}
		
		function filltab_b(what,style,where) {
			var list = `<li class="list $style"><a href="#" onclick="goto_b('$place')">$content</a></li>`
			var elements = $(what); 
			$(where+' ul').empty(); 
			$.each($(what), function(i, metadataItem){
				$(where+' ul').append(list.tpl({
					style:style, 
					place: '#'+elements[i].id,
					content: elements[i].innerHTML
				}) )
			});
			//highlights
			$('#person-tab_b').click(function(){
				$('#article_2 .mention-person').addClass('text-person')
				$("#clear_highlights").prop("checked", false);
			});
			
			//highlights
			$('#place-tab_b').click(function(){
				$('#article_2 .mention-place').addClass('text-place')
				$("#clear_highlights").prop("checked", false);
			});
				
			//highlights
			$('#organisation-tab_b').click(function(){
				$('#article_2 .mention-organisation').addClass('text-organisation')
				$("#clear_highlights").prop("checked", false);
			});
			
			//highlights
			$('#concept-tab_b').click(function(){
				$('#article_2 .mention-concept').addClass('text-concept')
				$("#clear_highlights").prop("checked", false);
			});
		}
		
		function goto_b(id) {
			var t = $(id).offset().top;
			console.log(t)
			var container_b = $('#article_2')
			container_b.animate({ scrollTop: t }, 200);
			$(id).addClass('animate');
			setTimeout(function(){
				$(id).removeClass('animate');
			},5000);
		}
		
		function filltab_c(what,style,where) {
			var list = `<li class="list $style"><a href="#" onclick="goto_c('$place')">$content</a></li>`
			var elements = $(what); 
			$(where+' ul').empty(); 
			$.each($(what), function(i, metadataItem){
				$(where+' ul').append(list.tpl({
					style:style, 
					place: '#'+elements[i].id,
					content: elements[i].innerHTML
				}) )
			});
			//highlights
			$('#person-tab_c').click(function(){
				$('#article_3 .mention-person').addClass('text-person')
				$("#clear_highlights").prop("checked", false);
			});
			
			//highlights
			$('#place-tab_c').click(function(){
				$('#article_3 .mention-place').addClass('text-place')
				$("#clear_highlights").prop("checked", false);
			});
				
			//highlights
			$('#organisation-tab_c').click(function(){
				$('#article_3 .mention-organisation').addClass('text-organisation')
				$("#clear_highlights").prop("checked", false);
			});
			
			//highlights
			$('#concept-tab_c').click(function(){
				$('#article_3 .mention-concept').addClass('text-concept')
				$("#clear_highlights").prop("checked", false);
			});
		}
		
		function goto_c(id) {
			var t = $(id).offset().top;
			console.log(t)
			var container_c = $('#article_3')
			container_c.animate({ scrollTop: t }, 200);
			$(id).addClass('animate');
			setTimeout(function(){
				$(id).removeClass('animate');
			},5000);
		}
		
		