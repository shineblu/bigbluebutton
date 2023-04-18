#!/usr/bin/sh
echo "Start compliation of bigbluebutton-html5"
meteor build --allow-superuser --server-only ~/dev/bigbluebutton/bigbluebutton-html5/meteorbundle >/dev/null 2>&1
tar -xzvf ~/dev/bigbluebutton/bigbluebutton-html5/meteorbundle/*.tar.gz -C /usr/share/meteor >/dev/null 2>&1
systemctl stop bbb-html5
systemctl start bbb-html5
echo "Ready"
