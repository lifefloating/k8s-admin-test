# k8s-admin-test


## task-view:
### Functional Requirements

1. **User Management**
   - **Registration**
     - Users can create an account.
   - **Login**
     - Users can log in to their accounts.
   - **Authentication**
     - Implement secure authentication (e.g., JWT, OAuth).

2. **Cluster Management**
   - **Create Clusters**
     - Users can create new Kubernetes clusters.
   - **Manage Nodes**
     - Users can add or remove nodes from their clusters.
     - Users can view the status of nodes.

3. **Application Deployment**
   - **Deploy Applications**
     - Users can deploy applications to specific nodes within their clusters.
   - **Application Management**
     - Users can view, update, or delete deployed applications.

4. **Command Line Interface**
   - **kubectl Integration**
     - Provide a frontend interface to issue `kubectl` commands.
     - Display output and logs from `kubectl` commands.

5. **Monitoring and Logging**
   - **Cluster Status**
     - Users can view the health and status of their clusters.
   - **Logs**
     - Provide access to logs from applications and Kubernetes events.

### Technical Considerations

- **Cloud Provider**: AWS (without using EKS or ECS).

### **Technical Design**

  - Develop the ER model diagram for user accounts, clusters, nodes, and applications.
  - Create an architectural diagram that outlines the overall system architecture.
  - Define the application framework (e.g., language, libraries, database).
  

 ## k8s Deploy Deployment
aws ec2 k8s
Single node, stand-alone version
![1](./images_readme/k8s-deploy0.png)

## ER models
1. **User**
   - **Attribute**:
     - User ID (user_id, primary key)
     - User name (username, unique)
     - Password
     - Password (password)
     - Creation time (created_at)

2.** Cluster**
   - **Attributes**:
     - Cluster ID (cluster_id, primary key)
     - Cluster name (cluster_name)
     - Cluster ID (cluster_id, primary key) Cluster name (cluster_name) User ID (user_id, foreign key, associated with the user)
     - Cluster name (cluster_name) User ID (user_id, foreign key, associated with the user) Creation time (created_at)
     - Status (status)

3. **Node**.
   - **Attributes**:
     - Node ID (node_id, primary key)
     - Node name (node_name)
     - Node name (node_name) Node ID (cluster_id, foreign key, associated with the cluster)
     - Cluster ID (cluster_id, foreign key, associated with the cluster)
     - Node name (node_name) Cluster ID (cluster_id, foreign key, associated with the cluster) Status (status)

4. **Application**.
   - **Attributes**:
     - Application ID (app_id, primary key)
     - Application name (app_name)
     - Application ID (app_id, primary key) Application name (app_name) Cluster ID (cluster_id, foreign key, associated with cluster)
     - Status (status)

5. **CommandLog**
   - **Attributes**:
     - Command ID (command_id, primary key)
     - User ID (user_id, foreign key, associated with the user)
     - Command ID (command_id, primary key) User ID (user_id, foreign key, associated with the user) Cluster ID (cluster_id, foreign key, associated with the cluster)
     - Command (command)
     - Execution time (executed_at)
     - Output (output)
     - Status (status)

## er models
er diagram
![2](./images_readme/er1.png)

## Basic implementation logic

### 1. Build a Kubernetes Cluster Manually

You can manually build a Kubernetes cluster on AWS, using the following tools and steps:

- **Kubernetes Deployment Tool**: use `kubeadm` to quickly build a Kubernetes cluster on an EC2 instance.
- **Cloud instances**: create multiple EC2 instances to act as master and worker nodes for Kubernetes.

### 2. Deploying the application

- **Docker image**:
  - Build a Docker image locally or in a CI/CD environment and push it to Docker Hub or AWS ECR.
  
- **Kubernetes YAML files**:
  - Use Kubernetes YAML files to define application deployments, services, and other resources.

- **kubectl deployment**:
  - Use the `kubectl apply -f <your-deployment-file>.yaml` command to deploy an application in a cluster.

### 3. Execute the kubectl command

- **kubectl configuration**:
  - Generates and stores a Kubernetes configuration file (typically `~/.kube/config`) after a user logs in so that `kubectl` can access the Kubernetes API.

- **Backend Processing**:
  - On the backend, execute incoming `kubectl` commands using a library similar to `os/exec` (e.g. Python's `subprocess` or Node.js' `child_process`).
  - Capture the command output and return the result to the frontend.
  
## Options
  Directly use https://github.com/kubernetes/dashboard as the front-end operation entrance