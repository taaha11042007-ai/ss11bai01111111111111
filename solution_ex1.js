
const devices = [
  {
    id: "AC01",
    name: "Dieu hoa phong khach",
    isActive: true,
    powerWatts: 2000
  },
  {
    id: "L01",
    name: "Den ngu",
    isActive: true,
    powerWatts: 10
  }
];

const findDeviceById = (devices, targetId) => {
  for (let i = 0; i < devices.length; i++) {
    if (devices[i].id === targetId) {
      return devices[i];
    }
  }

  return null;
};

const updateDevice = (devices, targetId, updatedData) => {
  const targetDevice = findDeviceById(devices, targetId);

  if (targetDevice === null) {
    return false;
  }

  if (updatedData.name !== undefined) {
    targetDevice.name = updatedData.name;
  }

  if (updatedData.isActive !== undefined) {
    targetDevice.isActive = updatedData.isActive;
  }

  if (updatedData.powerWatts !== undefined) {
    targetDevice.powerWatts = updatedData.powerWatts;
  }

  return true;
};

console.log("Trang thai ban dau:");
console.table(devices);

updateDevice(devices, "AC01", {
  isActive: false
});

updateDevice(devices, "L01", {
  powerWatts: 0
});

console.log("Trang thai sau khi cap nhat:");
console.table(devices);

console.log("Kiem tra dieu hoa da tat:", devices[0].isActive === false);
console.log("Kiem tra cong suat den ngu bang 0:", devices[1].powerWatts === 0);
