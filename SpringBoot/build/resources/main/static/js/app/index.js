var main = {
    init : function () {
        var _this = this;

        $('#btn-save').on('click', function () {
            _this.save();
        });
        $('#btn-update-check').on('click', function () {
            _this.updateCheck();
        });
        $('.btn-delete').on('click', function () {
            _this.delete();
        });
        $('#btn-comment-save').on('click', function () {
            _this.commentSave();
        });
        $('#admin_retagging').on('click', function(){
            _this.reTagging();
        });
        $('.admin_accept').on('click', function(){
            var checkBtn = $(this);

            var tr = checkBtn.parent().parent();
            var td = tr.children();

            var id = td.eq(0).text();
            var cid = td.eq(1).text();
            $.ajax({
                type: 'POST',
                url: '/api/v1/comments/ban/'+cid,
                dataType: 'json',
                contentType:'application/json; charset=utf-8',
            }).fail(function (error){
                alert(JSON.stringify(error));
            });
            $.ajax({
                type: 'POST',
                url: '/api/v1/reports/accept/'+id,
                dataType: 'json',
                contentType:'application/json; charset=utf-8',
            }).done(function() {
                alert('확인되었습니다.');
            }).fail(function (error){
                alert(JSON.stringify(error));
            });
        });
        $('.admin_abort').on('click', function(){

        });
        $('.btn_report').click(function() {
            var checkBtn = $(this);

            var tr = checkBtn.parent().parent();
            var td = tr.children();

            var id = td.eq(0).text();
            var content = td.eq(2).text();

            var words = prompt("어떤 단어를 신고하시겠습니까?")
            var data = {
                cid: id,
                content: content,
                words: words
            };
            $.ajax({
                type: 'PUT',
                url: '/api/v1/report/' + id,
                dataType: 'json',
                contentType: 'application/json; charset=utf-8'
            }).fail(function (error) {
                alert(JSON.stringify(error));
            });
            $.ajax({
                type: 'POST',
                url: '/api/v1/reports',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(data)
            }).fail(function (error) {
                alert(JSON.stringify(error));
            });
            alert('댓글이 신고되었습니다.');
        });
    },
    save : function () {
        var data = {
            title: $('#title').val(),
            author: $('#author').val(),
            content: $('#content').val()
        };
        $.ajax({
            type: 'POST',
            url: '/api/v1/posts',
            dataType: 'json',
            contentType:'application/json; charset=utf-8',
            data: JSON.stringify(data)
        }).done(function() {
            alert('글이 등록되었습니다.');
            window.location.href = '/';
        }).fail(function (error) {
            alert(JSON.stringify(error));
        });
    },
    updateCheck : function () {
        var data = {
            title: $('#title').val(),
            content: $('#content').val()
        };
        var id = $('#id').val();
        $.ajax({
            type: 'PUT',
            url: '/api/v1/posts/'+id,
            dataType: 'json',
            contentType:'application/json; charset=utf-8',
            data: JSON.stringify(data)
        }).done(function() {
            alert('글이 수정되었습니다.');
            window.location.href = '/posts/show/'+id;
        }).fail(function (error) {
            alert(JSON.stringify(error));
        });
    },
    delete : function () {
        var id = $('#id').val();

        $.ajax({
            type: 'DELETE',
            url: '/api/v1/posts/'+id,
            dataType: 'json',
            contentType:'application/json; charset=utf-8'
        }).done(function() {
            alert('글이 삭제되었습니다.');
            window.location.href = '/';
        }).fail(function (error) {
            alert(JSON.stringify(error));
        });
    },
    commentSave : function () {
        var data = {
            author: $('#author').val(),
            content: $('#content').val(),
            pid: $('#pid').val()
        };
        var pid = $('#pid').val();
        $.ajax({
            type: 'POST',
            url: '/api/v1/comments',
            dataType: 'json',
            contentType:'application/json; charset=utf-8',
            data: JSON.stringify(data)
        }).done(function() {
            alert('댓글이 등록되었습니다.');
            window.location.href = '/posts/show/'+pid;
        }).fail(function (error) {
            alert(JSON.stringify(error));
        });
    },
    reTagging : function (){
        alert("works!");
        $.ajax({
            type: 'POST',
            url: 'api/v1/retagging',
        }).done(function(){
            alert('태깅이 완료되었습니다.');
        }).fail(function(error){
            alert('다시 시도해주세요.')
        });
    }
};
main.init();