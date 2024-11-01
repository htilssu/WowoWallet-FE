import {Badge, Button, Container, Group, Skeleton, Text, Title} from '@mantine/core';
import {statusColors} from '../util/color.util.js';
import {statusStrings} from '../util/status.util.js';

const OrderDetails = ({order, isLoading}) => {

  return (<Container fluid className="w-full bg-white shadow-md px-6 py-4 rounded-lg">
    <Title order={2} className="text-gray-800 mb-4">
      {isLoading ? <Skeleton height={30} width="50%" radius="sm"/> : 'Thông tin đơn hàng'}
    </Title>

    {/* Mã đơn hàng */}
    <div className="mb-4">
      <Text c="dimmed" weight={500}>Mã đơn hàng:</Text>
      {isLoading ? <Skeleton height={20} width="30%"/> : <Text size="md">{order.id}</Text>}
    </div>

    {/* Dịch vụ */}
    <div className="mb-4">
      <Text c="dimmed" weight={500}>Dịch vụ:</Text>
      {isLoading ? <Skeleton height={20} width="60%"/> : <Text size="md">{order.serviceName}</Text>}
    </div>

    {/* Trạng thái */}
    <div className="mb-4">
      <Text c="dimmed" weight={500}>Trạng thái:</Text>
      {isLoading ? (<Skeleton height={20} width="40%"/>) : (
          <Badge color={statusColors[order.status]}>
            {statusStrings[order.status]}
          </Badge>)}
    </div>

    {/* Số tiền */}
    <div className="mb-4">
      <Text c="dimmed" weight={500}>Số tiền:</Text>
      {isLoading ? <Skeleton height={20} width="50%"/> : <Text size="md">{order.money.toLocaleString(
          'vi-VN')} VND</Text>}
    </div>

    {/* Ngày tạo */}
    <div className="mb-4">
      <Text c="dimmed" weight={500}>Ngày tạo:</Text>
      {isLoading ? <Skeleton height={20} width="40%"/> : <Text size="md">{new Date(order.created).toLocaleString(
          'vi-VN')}</Text>}
    </div>

    {/* Ngày cập nhật */}
    <div className="mb-4">
      <Text c="dimmed" weight={500}>Ngày cập nhật:</Text>
      {isLoading ? <Skeleton height={20} width="40%"/> : <Text size="md">{new Date(order.updated).toLocaleString(
          'vi-VN')}</Text>}
    </div>

    {/* Các mục đơn hàng */}
    <div className="mb-4">
      <Text c="dimmed" weight={500}>Các mục đơn hàng:</Text>
      {isLoading ? (<div className="space-y-2">
        <Skeleton height={20} width="100%"/>
        <Skeleton height={20} width="90%"/>
      </div>) : (<ul>
        {order.items.map((item, index) => (<li key={index} className="py-1">
          <div className="flex justify-between">
            <Text size="md" weight={500}>{item.name}</Text>
            <Text size="md">{item.unitPrice.toLocaleString('vi-VN')} VND x {item.amount}</Text>
          </div>
        </li>))}
      </ul>)}
    </div>

    {/* Nút hành động */}
    <Group position="apart" mt="lg">
      {isLoading ? (<Skeleton height={20} width="30%"/>) : (<Group>
        <Button component="a" href={order.returnUrl} variant="subtle" size="xs">
          Quay lại
        </Button>
      </Group>)}
      {isLoading ? (<Skeleton height={40} width="30%"/>) : (<Button component="a" color="blue">
        Thanh toán
      </Button>)}
    </Group>
  </Container>);
};

export default OrderDetails;
