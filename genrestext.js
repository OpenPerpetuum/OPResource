const startZoneId = 100;
const endZoneId = 141;
let str = '';
for (let i = startZoneId; i < endZoneId; i++) {
    const zoneId = `${i}`.padStart(4, '0');
    str += `
  |altitude${zoneId}=[
    |version=n0|language=i0|client=i0|compression=i1|size=i1e7ad4
    |path=$lang0000/layers/${zoneId}/altitude${zoneId}/00000000.dat
  ]
  |blocks${zoneId}=[
    |version=n0|language=i0|client=i0|compression=i1|size=i1fe7
    |path=$lang0000/layers/${zoneId}/blocks${zoneId}/00000000.dat
  ]
  |control${zoneId}=[
    |version=n0|language=i0|client=i0|compression=i1|size=i1fe7
    |path=$lang0000/layers/${zoneId}/control${zoneId}/00000000.dat
  ]
  |plants${zoneId}=[
    |version=n0|language=i0|client=i0|compression=i1|size=ia723
    |path=$lang0000/layers/${zoneId}/plants${zoneId}/00000000.dat
  ]`;
}
console.log(str)