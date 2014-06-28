//v2.0		proxy.pac		29-01-2013
// wpad files are pac files too :P
function FindProxyForURL(url,host)
{
var myip=myIpAddress()
var resd_ip=dnsResolve(host)
var proxies="PROXY <proxy_ip1>:<port>; PROXY <proxy_ip2>:<port>; DIRECT"

// localhost
// various definitions of localhost
if (host == "localhost" ||
	shExpMatch(host, "localhost.*") ||
	isInNet(resd_ip,"127.0.0.0","255.0.0.0")
	)
	{return "DIRECT";}
// bypass private net ranges - NRIP / RFC1918
// 
if (isInNet(resd_ip,"10.0.0.0","255.0.0.0") ||
	isInNet(resd_ip,"172.16.0.0","255.240.0.0") ||
	isInNet(resd_ip,"192.168.0.0","255.255.0.0")
	)
	{return "DIRECT";}
// Internal systems and lans
	// methods of handling hostnames
if (dnsDomainLevels(host)==0 ||
	isPlainHostName(host) ||
	// methods of individual bypasses
	host == "*.google.com:5222" ||  // wildcard stuff with or without port
	shExpMatch(host, "*.secdata.com") ||
	// host bypass
	host=="217.196.236.171"
	)
	{return "DIRECT";}
// VPN
// Maidstone
if (isInNet(myip,"192.168.20.0", "255.255.255.0") ||
	isInNet(myip,"192.168.44.0", "255.255.255.0")
	)
	{return proxies;}
// final 
return "DIRECT";
}
