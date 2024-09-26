## k8s指南

<table border="0">
    <tr>
        <td><strong>常用插件</strong><a href="docs/guide/index.md">+</a></td>
        <td><a href="docs/guide/kubedns.md">DNS</a></td>
        <td><a href="docs/guide/dashboard.md">dashboard</a></td>
        <td><a href="docs/guide/metrics-server.md">metrics-server</a></td>
        <!-- <td><a href="docs/guide/prometheus.md">prometheus</a></td>
        <td><a href="docs/guide/efk.md">efk</a></td> -->
    </tr>
    <tr>
        <td><strong>集群管理</strong><a href="docs/op/op-index.md">+</a></td>
        <td><a href="docs/op/op-node.md">管理node节点</a></td>
        <td><a href="docs/op/op-master.md">管理master节点</a></td>
        <td><a href="docs/op/op-etcd.md">管理etcd节点</a></td>
        <!-- <td><a href="docs/op/upgrade.md">升级集群</a></td>
        <td><a href="docs/op/cluster_restore.md">备份恢复</a></td> -->
    </tr>
</table>


## kubectl输出：
```
kubectl get node  
NAME            STATUS   ROLES    AGE     VERSION
172.31.75.216   Ready    master   9m45s   v1.26.0
bash-5.1# kubectl get pod -A   
NAMESPACE     NAME                                         READY   STATUS    RESTARTS   AGE
kube-system   calico-kube-controllers-89b744d6c-2j9z9      1/1     Running   0          9m48s
kube-system   calico-node-5gwkg                            0/1     Running   0          9m48s
kube-system   coredns-6665999d97-svs8n                     1/1     Running   0          9m21s
kube-system   dashboard-metrics-scraper-57566685b4-6zt7g   1/1     Running   0          9m15s
kube-system   kubernetes-dashboard-57db9bfd5b-787vl        1/1     Running   0          9m15s
kube-system   metrics-server-6bd9f986fc-kst5z              1/1     Running   0          9m18s
kube-system   node-local-dns-zjvhx                         1/1     Running   0          9m20s
bash-5.1# kubectl get svc -A 
NAMESPACE     NAME                        TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)                  AGE
default       kubernetes                  ClusterIP   10.68.0.1       <none>        443/TCP                  11m
kube-system   dashboard-metrics-scraper   ClusterIP   10.68.99.80     <none>        8000/TCP                 10m
kube-system   kube-dns                    ClusterIP   10.68.0.2       <none>        53/UDP,53/TCP,9153/TCP   10m
kube-system   kube-dns-upstream           ClusterIP   10.68.140.150   <none>        53/UDP,53/TCP            10m
kube-system   kubernetes-dashboard        NodePort    10.68.100.89    <none>        443:31961/TCP            10m
kube-system   metrics-server              ClusterIP   10.68.22.31     <none>        443/TCP                  10m
kube-system   node-local-dns              ClusterIP   None            <none>        9253/TCP                 10m
```

## k8s AllInOne Architecture
```
+----------------------------------+
|          (VM)             |
|                                  |
|  +----------------------------+  |
|  |        Kubernetes          |  |
|  |         Master             |  |
|  +----------------------------+  |
|  |         Etcd               |  |
|  +----------------------------+  |
|  |   Container Runtime        |  |
|  +----------------------------+  |
|  |        Kubernetes          |  |
|  |          Node              |  |
|  +----------------------------+  |
|  |      Net Plugin (Calico)     |  |
|  +----------------------------+  |
|  |        CoreDNS            |  |
|  +----------------------------+  |
|  |     Metrics Server         |  |
|  +----------------------------+  |
+----------------------------------+
```