// ----------------------------------------------------------------------------
function tree_requirement_list(type, projectNo, no, parentNo) {
	if ('P' == type) {
	    var jqxhr = $.post("/findRequirement.action", {projectNo : projectNo}, function(data) {
	        }).success(function(data) {
	            $("#treerelationcontents").html(data);
	        }).error(function(data) {
	            alert("error");
	        }).complete(function(data) {
	    });
	} else if ('R' == type) {
	    var jqxhr = $.post("/findRequirement.action", {projectNo : projectNo, parentNo : no}, function(data) {
	        }).success(function(data) {
	            $("#treerelationcontents").html(data);
	        }).error(function(data) {
	        	alert("error");
	         }).complete(function(data) {
	    });
	} else {
	    var jqxhr = $.post("/findRequirement.action", {projectNo : projectNo, parentNo : no}, function(data) {
	        }).success(function(data) {
	            $("#treerelationcontents").html(data);
	        }).error(function(data) {
	        	alert("error");
	         }).complete(function(data) {
	    });
	}
};
// -----------------------------------------------------------------------------
function refreshTree() {
    // 모델링 트리 출력.
	var jqxhr = $.post("/modelingTree.action", {}, function(data) {
	}).success(function(data) {
	    $("#dtree").html(data);
	}).error(function(data) {
	    alert("modeling tree refresh fail !");
	    }).complete(function(data) {
	    });
};
// -----------------------------------------------------------------------------
function addFormTable(projectNo) {
    var jqxhr = $.post("/addFormTable.action", {projectNo : projectNo}, function(data) {
	}).success(function(data) {
	    $("#contentarea").html(data);
	}).error(function(data) {
	    alert("table form load fail !");
	    }).complete(function(data) {
	    });
};
// -----------------------------------------------------------------------------
function addTable(projectNo) {
    var jqxhr = $.post("/addTable.action", $("#form_table").serialize(), function(data) {
	}).success(function(data) {
	    alert("table add ok !");
	    refreshTree();
	    findTable(projectNo);
	}).error(function(data) {
	    alert("table add fail !");
	    }).complete(function(data) {
	    });
};
// -----------------------------------------------------------------------------
function findTable(projectNo) {
    var jqxhr = $.post("/findTable.action", {projectNo : projectNo}, function(data) {
	}).success(function(data) {
	    $("#contentarea").html(data);
	}).error(function(data) {
	    alert("table list fail !");
	    }).complete(function(data) {
	    });
};
// -----------------------------------------------------------------------------
function viewTable(tableNo) {
    var jqxhr = $.post("/viewTable.action", {no : tableNo}, function(data) {
	}).success(function(data) {
	    $("#contentarea").html(data);
	}).error(function(data) {
	    alert("table load fail !");
	    }).complete(function(data) {
	    });
};
// -----------------------------------------------------------------------------
function editFormTable(tableNo) {
    var jqxhr = $.post("/editFormTable.action", {no : tableNo}, function(data) {
	}).success(function(data) {
	    $("#contentarea").html(data);
	}).error(function(data) {
	    alert("table form load fail !");
	    }).complete(function(data) {
	    });
};
// -----------------------------------------------------------------------------
function editTable(projectNo) {
    var jqxhr = $.post("/editTable.action", $("#form_table").serialize(), function(data) {
	}).success(function(data) {
	    alert("table edit ok !");
	    refreshTree();
	    findTable(projectNo);
	}).error(function(data) {
	    alert("table edit fail !");
	    }).complete(function(data) {
	    });
};
// -----------------------------------------------------------------------------
function removeTable(tableNo, projectNo) {
	if (confirm("테이블에 존재하는 컬럼도 삭제됩니다.\r\n테이블을 삭제하시겠습니까?")) {
    var jqxhr = $.post("/removeTable.action", {no : tableNo}, function(data) {
    }).success(function(data) {
        alert("table remove ok !");
        refreshTree();
        findTable(projectNo);
    }).error(function(data) {
        alert("table remove fail !");
        }).complete(function(data) {
        });        		
	}
};
// -----------------------------------------------------------------------------
function addFormColumn(tableNo, projectNo) {
    var jqxhr = $.post("/addFormColumn.action", {tableNo: tableNo, projectNo: projectNo}, function(data) {
}).success(function(data) {
    $("#contentarea").html(data);
}).error(function(data) {
    alert("column form load fail !");
    }).complete(function(data) {
    });
};
// -----------------------------------------------------------------------------
function addColumn(tableNo, projectNo) {
    var jqxhr = $.post("/addColumn.action", $("#form_column").serialize(), function(data) {
}).success(function(data) {
    alert("column add ok !");
    findColumn(tableNo, projectNo);
}).error(function(data) {
    alert("column add fail !");
    }).complete(function(data) {
    });
};
// -----------------------------------------------------------------------------
function findColumn(tableNo, projectNo) {
    var jqxhr = $.post("/findColumn.action", {tableNo : tableNo, projectNo : projectNo}, function(data) {
}).success(function(data) {
    $("#contentarea").html(data);
}).error(function(data) {
    alert("column list fail !");
    }).complete(function(data) {
    });
};
// -----------------------------------------------------------------------------
function viewColumn(columnNo) {
    var jqxhr = $.post("/viewColumn.action", {no : columnNo}, function(data) {
}).success(function(data) {
    $("#contentarea").html(data);
}).error(function(data) {
    alert("column load fail !");
    }).complete(function(data) {
    });
};
// -----------------------------------------------------------------------------
function editFormColumn(columnNo) {
    var jqxhr = $.post("/editFormColumn.action", {no : columnNo}, function(data) {
}).success(function(data) {
    $("#contentarea").html(data);
}).error(function(data) {
    alert("column form load fail !");
    }).complete(function(data) {
    });
};
// -----------------------------------------------------------------------------
function editColumn(tableNo, projectNo) {
    var jqxhr = $.post("/editColumn.action", $("#form_column").serialize(), function(data) {
}).success(function(data) {
    alert("column edit ok !");
    findColumn(tableNo, projectNo);
}).error(function(data) {
    alert("column edit fail !");
    }).complete(function(data) {
    });
};
// -----------------------------------------------------------------------------
function removeColumn(columnNo, tableNo, projectNo) {
    if (confirm("컬럼을 삭제하시겠습니까?")) {
    var jqxhr = $.post("/removeColumn.action", {no : columnNo}, function(data) {
    }).success(function(data) {
        alert("column remove ok !");
        findColumn(tableNo, projectNo);
    }).error(function(data) {
        alert("column remove fail !");
        }).complete(function(data) {
        });             
    }
};
// -----------------------------------------------------------------------------
function findTableEnglishName() {
	var koreanName = $('#koreanName').val();
if ($.trim(koreanName).length > 0) {
	var parameters = "?koreanName=" + koreanName;
    var url = "/popUpFindTableEnglishName.action" + parameters;
    window.open(url, "popup_find_table_english_name","status=yes, menubar=no, scrollbars=yes, resizable=no, width=500, height=250");
} else {
	alert("한글명을 입력하세요.");
	$('#koreanName').focus();
	}
};
// -----------------------------------------------------------------------------
function findColumnEnglishName() {
    var koreanName = $('#koreanName').val();
if ($.trim(koreanName).length > 0) {
    var parameters = "?koreanName=" + koreanName;
    var url = "/popUpFindColumnEnglishName.action" + parameters;
    window.open(url, "popup_find_column_english_name","status=yes, menubar=no, scrollbars=yes, resizable=no, width=500, height=250");
} else {
    alert("한글명을 입력하세요.");
    $('#koreanName').focus();
    }
};
// -----------------------------------------------------------------------------
function makeSchemaFile(fileName) {
    // 스키마 파일 생성.
var filePath = "D:\\project_" + fileName + ".sql";

var jqxhr = $.post("/makeSchemaFile.action", $("#form_schema_file").serialize(), function(data) {
}).success(function(data) {
    alert("스키마 파일 생성 완료 !\r\n" + filePath);
}).error(function(data) {
    alert("스키마 파일 생성 실패 !");
    }).complete(function(data) {
    });
};
// -----------------------------------------------------------------------------