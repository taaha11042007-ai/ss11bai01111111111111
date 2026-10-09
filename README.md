# Dò vết và sửa lỗi Falsy Value khi cập nhật trạng thái thiết bị thông minh

## 1. Phân tích lỗi

Trong JavaScript, các giá trị `0`, `false`, `""`, `null` và `undefined` đều là những giá trị Falsy. Khi sử dụng một giá trị Falsy làm điều kiện trong câu lệnh `if`, chương trình sẽ không thực hiện khối lệnh bên trong.

Trong mã nguồn ban đầu:

- `if (updatedData.isActive)` bỏ qua việc cập nhật khi `isActive` có giá trị `false`.
- `if (updatedData.powerWatts)` bỏ qua việc cập nhật khi `powerWatts` có giá trị `0`.
- `if (updatedData.name)` cũng bỏ qua việc cập nhật nếu tên mới là chuỗi rỗng.

Nguyên nhân là điều kiện `if (prop)` kiểm tra giá trị có được xem là Truthy hay không, chứ không kiểm tra thuộc tính có được truyền vào hay không.

## 2. Cách sửa lỗi

Thay các điều kiện kiểm tra bằng `prop !== undefined`.

Ví dụ:

- `updatedData.isActive !== undefined`: cho phép cập nhật cả `true` và `false`.
- `updatedData.powerWatts !== undefined`: cho phép cập nhật cả số dương và `0`.
- `updatedData.name !== undefined`: kiểm tra thuộc tính tên có được truyền vào hay không.

Cách kiểm tra này vẫn cho phép cập nhật các giá trị Falsy hợp lệ, đồng thời không ghi đè thuộc tính khi dữ liệu cập nhật không chứa thuộc tính đó.

Hàm `findDeviceById` sử dụng vòng lặp để tìm thiết bị theo mã. Nếu không tìm thấy thiết bị, hàm trả về `null`; khi đó `updateDevice` trả về `false`. Nếu tìm thấy, chương trình cập nhật dữ liệu và trả về `true`.

## 3. Bảng Test Cases

| Trường hợp kiểm thử | Dữ liệu đầu vào | Kết quả sai thực tế | Kết quả đúng mong đợi |
|---|---|---|---|
| Tắt điều hòa phòng khách | `targetId: "AC01"`, `updatedData: { isActive: false }` | `isActive` vẫn là `true` do điều kiện `if (updatedData.isActive)` không được thực hiện | `isActive` được cập nhật thành `false` |
| Đưa công suất đèn ngủ về 0W | `targetId: "L01"`, `updatedData: { powerWatts: 0 }` | `powerWatts` vẫn là `10` do điều kiện `if (updatedData.powerWatts)` không được thực hiện | `powerWatts` được cập nhật thành `0` |

## 4. Kết quả kiểm thử

Sau khi sửa mã nguồn:

- Điều hòa `AC01` có `isActive = false`.
- Đèn ngủ `L01` có `powerWatts = 0`.
- Hai câu lệnh kiểm tra cuối chương trình đều trả về `true`.

## 5. Kết luận

Lỗi xuất phát từ việc sử dụng điều kiện `if (prop)` để kiểm tra dữ liệu cập nhật. Sử dụng `prop !== undefined` giúp phân biệt trường hợp không truyền thuộc tính với trường hợp thuộc tính được truyền một giá trị Falsy hợp lệ như `false` hoặc `0`. Nhờ đó, hệ thống cập nhật trạng thái thiết bị đúng theo yêu cầu nghiệp vụ.
