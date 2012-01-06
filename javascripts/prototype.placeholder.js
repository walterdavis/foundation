var test = new Element('input', {placeholder:'foo'});
if(test.placeholder != 'foo'){
	Element.addMethods({
		addPlaceholder: function(element){
			var element = $(element);
			var place_text = element.readAttribute('placeholder');
			var color = element.getStyle('color');
			if(!!place_text && $F(element) == ''){
				element.setStyle('color','gray').setValue(place_text);
				element.observe('focus', function(){
					element.setStyle('color',color);
					if($F(element) == place_text) element.setValue('');
				});
				element.observe('blur', function(){
					element.setStyle('color','gray');
					if($F(element) == '') element.setValue(placeText);
				});
			}
			return element;
		}
	});
}