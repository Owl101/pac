//v2.0		proxy.pac		29-01-2013
// wpad files are pac files too :P
function FindProxyForURL(url,host)
{
/* 
For complex pac files it is best that you assign commonly executed functions
to a variable rather than running them repeated during each check.  You'll be
surprised how much time it can save you when loading complex websites.
*/
var myip=myIpAddress()
var resd_ip=dnsResolve(host)
var proxies="PROXY 192.168.0.1:80; PROXY 192.168.1.1:8080; DIRECT"

// localhost
// various definitions of localhost
if (host == "localhost" ||
	shExpMatch(host, "localhost.*") ||
	shExpMatch(host, "*.local") ||
	isInNet(resd_ip,"127.0.0.0","255.0.0.0")
	)
	{return "DIRECT";}
// bypass for private network ranges - NRIP / RFC1918
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
	shExpMatch(host, "*.mysite.com") ||
	// host bypass
	host=="8.8.8.8"
	)
	{return "DIRECT";}
// VPN
// Sometown
if (isInNet(myip,"192.168.20.0", "255.255.255.0") ||
	isInNet(myip,"192.168.44.0", "255.255.255.0")
	)
	{return proxies;}
// final 
return "DIRECT";
}
