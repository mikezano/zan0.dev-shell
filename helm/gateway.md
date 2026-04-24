## Add to the helm repo list

helm repo add envoy-gateway oci://docker.io/envoyproxy

helm install eg oci://docker.io/envoyproxy/gateway-helm --version v1.7.0 -n envoy-gateway-system --create-namespace

helm install eg oci://docker.io/envoyproxy/gateway-helm --version v1.7.0 -n envoy-gateway-system --create-namespace
