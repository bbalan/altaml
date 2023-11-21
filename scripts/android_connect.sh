# Automatically connect to android device for remote debugging.
# 1. Enable wireless debugging in your Android device settings.
# 2. Enter device's IP address:port in scripts/.android_wireless_debug
# 3. Run `yarn android`

SCRIPT_DIR="$(dirname "$(readlink -f "$0")")"

connect_device() {
  CONFIG_FILE_PATH="$SCRIPT_DIR/.android_wireless_debug"
  IP_REGEX="([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})(:[0-9]{1,5})?"

  DEVICE_ADDRESS=$(grep -o -m 1 -E $IP_REGEX "$CONFIG_FILE_PATH")

  # Get arguments and extract IP from the argument list
  for ((i=1; i<=$#; i++)); do
    if [ "${!i}" = "--ip" ]; then
      next_index=$((i + 1))
      DEVICE_ADDRESS="${!next_index}"
    fi
  done

  if [ -z "$DEVICE_ADDRESS" ]; then
    echo "Error: run with --ip IP_ADDRESS:PORT of target device or enter it at scripts/.android_wireless_debug"
    exit 1
  fi

  adb disconnect
  adb connect $DEVICE_ADDRESS
}

connect_device
