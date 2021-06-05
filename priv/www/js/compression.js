const compressionPropertyKey = 'z-compression-type';
const brotli = 'brotli';

dispatcher_add(function(sammy) {
});

get_msgs = function(params) {
    var path = fill_path_template('/queues/:vhost/:name/get', params);
    with_req('POST', path, JSON.stringify(params), function(resp) {
            var msgs = JSON.parse(resp.responseText);
            if (msgs.length == 0) {
                show_popup('info', 'Queue is empty');
            } else {
                var scriptTag = document.createElement('script');
                scriptTag.type = 'text/javascript';
                scriptTag.src = 'js/decode.js';
                document.head.appendChild(scriptTag);

                $('#msg-wrapper').slideUp(200);
                replace_content('msg-wrapper', format('messages-compressed', {'msgs': msgs}));
                $('#msg-wrapper').slideDown(200);
            }
        });
}

function isCompressed(messageProperties){
    var compressionAlgorithm = messageProperties.headers[compressionPropertyKey];

    if(compressionAlgorithm == null){
        return [false, null];
    }

    return [true, compressionAlgorithm];
}

function decompress(initiator, compressionAlgorithm, compressedPayload, payloadEncoding, source){
    var payload = compressedPayload;

    switch(compressionAlgorithm.toLowerCase()){
        case brotli:
            payload = BrotliDecompress(compressedPayload); 
            break; 
        default: 
            console.log('Compression algorithm not been implemented!');
    }

    var formatted = prettyIfJson(payload);
    $('#' + source).text(formatted);
}

function BrotliDecompress(compressedPayload){
    var raw = atob(compressedPayload);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));

    for (i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
    }

    return new TextDecoder().decode(BrotliDecode(array));
}

function prettyIfJson(payload){
    try{
        var jsonString = JSON.parse(payload);
        
        return JSON.stringify(jsonString, null, 2); 
    } catch(e){
        return payload;
    }
}