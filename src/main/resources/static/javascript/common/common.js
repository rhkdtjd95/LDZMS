function checkAll() {
    $('input:checkbox[name=export]').each(function(e) {
        if (this.checked) {
            this.checked = false;
        } else {
            this.checked = true;
        }
    });
};


// -------------------------------------------------------------------------
function exportExcel() {
    if (emptyText($('input:checkbox[name=export]:checked'), true, '선택된 항목이 없습니다.')) {
        return false;
    }

    var parameters = '';
    $('input[name=export]').each(function(e) {
        if (this.checked) {
            var indexTr = e + 1;
            parameters = parameters + jQuery.trim($('table').find('tbody tr:nth-child(' + indexTr + ')').find('td:eq(1)').html()) + ':';
        }
    });
    parameters = parameters.substring(0, parameters.length - 1);
    go('exportIssue', {'export':parameters});
};
// -------------------------------------------------------------------------

// -------------------------------------------------------------------------
function log_in() {
    if (emptyText($('#userId'), true, '아이디를 입력하세요.')) {
        return false;
    }

    if (emptyText($('#userPassword'), true, '비밀번호를 입력하세요.')) {
        return false;
    }

    go('login', {'userId':$('#userId').val(),'userPassword':$('#userPassword').val()});
};
// -------------------------------------------------------------------------
function log_out() {
    go('logout', '');
};
// -------------------------------------------------------------------------

/**
 * <p>
 *     문자를 비교하여 일치, 불일치 여부에 검증.
 * </p>
 * 
 * @param  jQuery Selector
 * @param  String
 * @param  boolean
 * @param  String
 * @return boolean
 */
function compareText(selector, compareString, option, messages) {
    if (empty(selector.val())) {
        alert(messages);
        selector.focus();
        return true;
    }

    if (option) {
        if (selector.val() == compareString) {
            alert(messages);
            selector.focus();
            return true;
        } else {
            return false;
        }
    } else {
        if (selector.val() != compareString) {
            alert(messages);
            selector.focus();
            return true;
        } else {
            return false;
        }
    }
};


/**
 * <p>
 *     문자열 공란 여부 체크.
 * </p>
 * 
 * @param  String
 * @return boolean
 */
function empty(string) {
    try {
        if (($.trim(string)).length > 0) {
            return false;
        }

        return true;
    } catch (e) {
        alert(e.Message);
    }
};


/**
 * <p>
 *     엘리먼트 텍스트가 공란인 경우 메시지 출력.
 * </p>
 * 
 * @param  jQuery Selector
 * @param  boolean
 * @param  String
 * @return boolean
 */
function emptyText(selector, flag, messages) {
    try {
        if (selector == null) {
            if (flag) {
                alert(messages);
            }

            return true;
        }
    
        if (empty(selector.val())) {
            if (flag) {
                alert(messages);
            }

            selector.focus();

            return true;
        }
    
        return false;
    } catch (e) {
        alert(e.Message);
    }
};


/**
 * <p>
 *     폼 전송.
 * </p>
 * 
 * @param  String
 * @param  String
 * @param  String
 */
function go(url, parameters, target) {
    try {
        var form_00 = document.createElement('form');
        var object;
        var value;
        for (var key in parameters) {
            value = parameters[key];
            object = document.createElement('input');
            object.setAttribute('type', 'hidden');
            object.setAttribute('name', key);
            object.setAttribute('value', value);
            form_00.appendChild(object);
        }

        if (url.indexOf("remove") != -1) {
            var messages = "삭제하시겠습니까 ?";
            if (!confirm(messages)) {
                return false;
            }
        }

        if (target) {
            form_00.setAttribute('target', target);
        }

        form_00.setAttribute('method', 'post', value);
        form_00.setAttribute('action', '/' + url + '.action');
        document.body.appendChild(form_00);
        form_00.submit();

        /* JQuery Bug
        $('body').append('<form id=\'form_00\'>');
        $('#form_00').attr('method', 'post')
                     .attr('action', url + '.action')
                     .attr('name', 'form_00');

        for (var key in parameters) {
            var value = parameters[key];
            // alert("key : [" + key + "] / value : [" + value + "]");
            $('#form_00').append('<input id=\"' + key + '\" name=\"' + key + '\" type=\"hidden\" value=\"' + value + '\">');
        }

        if (url.indexOf("remove") != -1) {
            var messages = "삭제하시겠습니까 ?";
            if (!confirm(messages)) {
                return false;
            }
        }

        if (url.indexOf("list") != -1) {
            var business = url.substring(4, url.length);

            if ('issue' == business) {
                $('#form_00').append('<input id=\"ORDER_COLUMN\" name=\"ORDER_COLUMN\" type=\"hidden\" value=\"PI.REGISTRATION_DATE\">');
                $('#form_00').append('<input id=\"ORDER_TYPE\" name=\"ORDER_TYPE\" type=\"hidden\" value=\"DESC\">');
            }
        }

        if (target) {
            $('#form_00').attr('target', target);
        }
        
        $('#form_00').submit();
        */
    } catch (e) {
        alert(e.Message);
    }
};


/**
 * <p>
 *     페이지 폼 전송.
 * </p>
 * 
 * @param  String
 * @param  String
 * @param  String
 */
function go_page(url, page) {
//    var url = // "/list" + 
//              url.substring(0, 1).toUpperCase() + url.substring(1, url.length);
    go(url, {'page':page});    
};


/**
 * <p>
 *     팝업 폼 전송.
 * </p>
 * 
 * @param  String
 * @param  String
 * @param  String
 * @param  String
 */
function goPopUp(name, url, parameters, options) {
    try {
        var option = '';
        var width;
        var height;
        var topPosition;
        var leftPosition;

        for (var key in options) {
            var value = options[key];
            // alert("key : [" + key + "] / [" + value + "]");
            if (key == 'width') {
                option = option + 'width=' + value + ', ';
                option = option + 'left=' + ((screen.width - value) / 2); 
            } else if (key == 'height') {
                option = option + 'height=' + value + ', ';
                option = option + 'top=' + ((screen.height - value) / 2);
            } else  {
                option = option + key + '=' + value;
            }
            option = option + ', ';
        }

        var popUp = window.open('', name, option);
        if (!window.focus()) {
            popUp.focus();
        }

        go(url, parameters, name, popUp);
    } catch (e) {
        alert(e.Message);
    }
};


/**
 * <p>
 *     윈도우 닫기.
 * </p>
 */
function closeWindow() {
    try {
        window.close();
    } catch (e) {
        alert(e.Message);
    }
};
