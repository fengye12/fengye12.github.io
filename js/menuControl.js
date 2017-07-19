/*
* @Author: anchen
* @Date:   2017-06-28 16:30:12
* @Last Modified by:   anchen
* @Last Modified time: 2017-07-07 14:03:30
*/
var a1="a15",a2="a1502";//用于navLeft，标示当前页面
var setting = {
    view: {
        selectedMulti: false,
            showTitle: showTitleForTree//设置title显示
        },
        edit: {
            enable: false,
            editNameSelectAll: true,
            showRemoveBtn: showRemoveBtn,
            showRenameBtn: showRenameBtn
        },
        data: {
            key: {
                title:"t"
            },
            simpleData: {
                enable: true
            }
        },
        callback: {
            beforeClick: zTreeBeforeClick,
            beforeDrag: beforeDrag,

            beforeRemove: beforeRemove,
            // beforeRename: beforeRename,
            // onRemove: onRemove
            // onRename: onRename
        }
    };


    var zNodes =[
    { id:1, pId:0, name:"企业档案", open:true, icon:"../style/css/zTreeStyle/img/diy/1_open.png"},
    { id:2, pId:0, name:"食品档案", open:true, icon:"../style/css/zTreeStyle/img/diy/4.png"},
    { id:3, pId:0, name:"票据备案", open:true},
    { id:31, pId:3, name:"票据整理", icon:"../style/css/zTreeStyle/img/diy/2.png",clickurl:"wwwwww"},
    { id:32, pId:3, name:"票据录入", icon:"../style/css/zTreeStyle/img/diy/3.png"},
    { id:4, pId:0, name:"客服中心", open:true, icon:"../style/css/zTreeStyle/img/diy/4.png"},
    { id:41, pId:4, name:"注册企业审查", icon:"../style/css/zTreeStyle/img/diy/6.png"},
    { id:42, pId:4, name:"交易对象审查", icon:"../style/css/zTreeStyle/img/diy/7.png"},
    { id:43, pId:4, name:"食品信息审查", icon:"../style/css/zTreeStyle/img/diy/8.png"},
    { id:44, pId:4, name:"企业账号管理", icon:"../style/css/zTreeStyle/img/diy/8.png"},
    { id:45, pId:4, name:"企业培训", icon:"../style/css/zTreeStyle/img/diy/8.png"},
    { id:46, pId:4, name:"异常企业预警", icon:"../style/css/zTreeStyle/img/diy/8.png"},
    { id:47, pId:4, name:"企业服务记录", icon:"../style/css/zTreeStyle/img/diy/8.png"},
    { id:48, pId:4, name:"企业帮助", icon:"../style/css/zTreeStyle/img/diy/8.png"},
    { id:5, pId:0, name:"数据维护", open:true, icon:"../style/css/zTreeStyle/img/diy/4.png"},
    { id:51, pId:5, name:"食药监信息维护", icon:"../style/css/zTreeStyle/img/diy/6.png"},
    { id:52, pId:5, name:"生产许可食品分类维护", icon:"../style/css/zTreeStyle/img/diy/7.png"},
    { id:53, pId:5, name:"经营项目维护", icon:"../style/css/zTreeStyle/img/diy/8.png"},
    { id:6, pId:0, name:"后台管理", open:true, icon:"../style/css/zTreeStyle/img/diy/4.png"},
    { id:61, pId:6, name:"账号", icon:"../style/css/zTreeStyle/img/diy/6.png"},
    { id:62, pId:6, name:"用户组", icon:"../style/css/zTreeStyle/img/diy/7.png"}

    ];

    function showTitleForTree(treeId, treeNode) {
        return treeNode.level != 1;
    };

    $(document).ready(function(){
        var newCount = 1;
        $.fn.zTree.init($("#treeDemo"), setting, zNodes);
        　var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
        　　//拿到所有树节点
        　　var nodes = treeObj.getNodes();
        　　//for循环逐个修改树节点属性
        　　for(var i = 0;i<nodes.length;i++)
        　　{
            　　nodes[i].t = nodes[i].name+
            "ID:"+nodes[i].tId.split('_')[1]+
            "  权限提示:50;"
        　　//更新节点
        treeObj.updateNode(nodes[i]);
    　　}

    　//保存节点
    $(".save").click(function(event) {
        var index1=layer.confirm('确定要新增根节点吗？', {
                  btn: ['确定','取消'] //按钮
              }, function(){
                layer.close(index1)
                refreshParentNode() ;

            })
    });

    　//刷新选中节点
    $(".refesh").click(function(event) {
        refresh() ;
    });

    　//刷新所有节点
    $(".refeshAll").click(function(event) {
        refreshAll() ;
    });

    //输入父节点新增
    $(".addnew").click(function(event) {
        /* Act on the event */
        var index5=layer.confirm('确定要新增根节点吗？', {
                  btn: ['确定','取消'] //按钮
              }, function(){
                layer.close(index5)
                var val=$(".parentId").val();
                if(val==""){

                    layer.confirm('请输入父节点的id', { btn: ['确定'] });
                }else{
                    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                    var nodes = treeObj.getNodes();
                    selectedNode = zTree.getNodeByTId("treeDemo_"+val)
                    if(selectedNode){
                        add(selectedNode)
                    }else{
                        layer.confirm('父节点不存在', { btn: ['确定'] });
                    }
                }

            })

    });

    //新增根节点
    $(".addRootNode").on('click', function(event) {
        event.preventDefault();
        var index3=layer.confirm('确定要新增根节点吗？', {
                  btn: ['确定','取消'] //按钮
              }, function(){
                layer.close(index3)
                var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                zTree.addNodes(null, {id:(100 + newCount), pId:0, name:"new node" + (newCount++)});
            })
    });

    //新增子节点
    $(".addChildNode").on('click', function(event) {
        event.preventDefault();
        var index4=layer.confirm('确定要新增子节点吗？', {
                  btn: ['确定','取消'] //按钮
              }, function(){
                layer.close(index4)
                var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                var selectedNode = zTree.getSelectedNodes();
                if(selectedNode.length==0){
                    layer.confirm('请选择一个要进行操作的节点！', { btn: ['确定'] });
                }else{
                    zTree.addNodes(selectedNode[0], {id:(100 + newCount), pId:selectedNode.id, name:"new node" + (newCount++)});


                }
            })
    });

    //拖拽
    var canDrag=0;
    $(".drag").click(function(event) {
        /* Act on the event */
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        canDrag=canDrag+1;
        if(canDrag%2!=0){
                zTree.setEditable(true)//设置为编辑状态 就可以进行拖拽
                $(".drag").addClass('click')
            }else{
                zTree.setEditable(false)
                $(".drag").removeClass('click')
            }

        });

            // 删除选中节点
            $(".delete").click(function(event) {
                /* Act on the event */
                var index2=layer.confirm('删除后不可恢复，确定要删除吗？', {
                  btn: ['确定','取消'] //按钮
              }, function(){
                layer.close(index2)
                var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                selectedNode = zTree.getSelectedNodes();
                if(selectedNode.length==0){
                    layer.confirm('请选择一个要进行操作的节点！', { btn: ['确定'] });
                }else{
                    beforeRemove(selectedNode[0])

                }

            });
            });
        });

    // darg控制
    function beforeDrag(treeId, treeNodes) {
          return true;//return fasle 就不可以拖拽了
      }

        // 点击节点
        function zTreeBeforeClick(treeId, treeNode, clickFlag) {
        $(".name").val(treeNode.name)
        $(".url").val(treeNode.clickurl)
        $(".navigate").val(treeNode.navigate)
        $(".ID").text(treeNode.tId.split("_")[1])
        $(".Lv").text(treeNode.level)
    };
    // 隐藏btn
    function showRemoveBtn(treeId, treeNode) {
          // return !treeNode.isFirstNode;
          return false;
      }
      function showRenameBtn(treeId, treeNode) {
          // return !treeNode.isLastNode;
          return false;
      }

          // * 刷新当前选择节点的父节点
        function refreshParentNode() {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
            type = "refresh",
            silent = false,
            selectedNode = zTree.getSelectedNodes();
            if(selectedNode.length==0){
                layer.confirm('请选择一个需要进行保存的节点！', { btn: ['确定'] });
            }else{
                for(var i=0;i<selectedNode.length;i++){
                    selectedNode[i].name=$(".name").val();
                    selectedNode[i].clickurl=$(".url").val();
                    selectedNode[i].navigate=$(".navigate").val();
                    console.log(selectedNode[i])
                    zTree.updateNode(selectedNode[i]);
                }
                // layer.close(index1)
            }

        }

        //删除节点
        function beforeRemove(treeNode) {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            zTree.selectNode(treeNode);
            zTree.removeNode(treeNode)
        }

        // 刷新当前节点
        function refresh() {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
            type = "refresh",
            silent = false,
            selectedNode = zTree.getSelectedNodes();
            if(selectedNode.length==0){
                layer.confirm('请选择一个要进行操作的节点！', {
             btn: ['确定'] //按钮
         });
            }else{
                var index = layer.load(3,{
                    offset: ['430px', '430px']
                });
                setTimeout(function(){
                    layer.closeAll('loading');
                }, 500)
                var index = layer.load(3,{
                    offset: ['430px', '430px']
                });
                setTimeout(function(){
                    layer.closeAll('loading');
                }, 500)
                for(var i=0;i<selectedNode.length;i++){

                    zTree.updateNode(selectedNode[i]);
                }
            }
        }

        //刷新所有节点
        function refreshAll() {
            var index = layer.load(3,{
                offset: ['430px', '430px']
            });
            setTimeout(function(){
                layer.closeAll('loading');
            }, 500)
            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            selectedNode = zTree.getNodes();
            for(var i=0;i<selectedNode.length;i++){
                zTree.updateNode(selectedNode[i]);
            }
        }

        //节点移动
        function moveNode(type){
            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            var selectedNode = zTree.getSelectedNodes();
            var nodes = zTree.getNodes();
            if(selectedNode.length==0){
                layer.confirm('请选择一个要进行操作的节点！', {
             btn: ['确定'] //按钮
         });
            }else{
                if(type=='top'){
                    zTree.moveNode(nodes[0],selectedNode[0],'prev');
                }
                if(type=='bottom'){
                    zTree.moveNode(nodes[nodes.length-1],selectedNode[0],'next');
                }
                if(type=='up'){
                    var preNode=selectedNode[0].getPreNode();
                    zTree.moveNode(preNode,selectedNode[0],'prev');
                }
                if(type=='down'){
                    var nextNode=selectedNode[0].getNextNode();
                    zTree.moveNode(nextNode,selectedNode[0],'next');
                }
            }
        }
        var newCount=1;
        function add(selectedNode){
            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            zTree.addNodes(selectedNode, {id:(100 + newCount), pId:selectedNode.id, name:"new node" + (newCount++)});
        }

        $(function(){
            //当前导航
            getActiveN("a15","a1502")

        })
