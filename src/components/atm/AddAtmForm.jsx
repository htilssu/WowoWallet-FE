import 'react-toastify/dist/ReactToastify.css';
import {wGet} from '../../util/request.util.js';
import {useForm} from '@mantine/form';
import {useQuery} from '@tanstack/react-query';
import ATMCard from '../ATMCard.jsx';
import {Button, Divider, NumberInput, Select, TextInput} from '@mantine/core';
import {useMemo} from 'react';
import {addCard} from '../../modules/card.js';
import {validateExpiredTime} from '../../modules/wallet/wallet.js';

const AddAtmForm = ({onSubmit}) => {
  const {data: bankList} = useQuery({
    queryKey: ['bank-list'],
    queryFn: async () => await wGet('/v1/banks'),
    staleTime: 1000 * 60 * 60,
  });

  const form = useForm({
    initialValues: {
      bankId: '',
      cardNumber: '',
      holderName: '',
      month: '',
      year: '',
    },
    validate: {
      expired: validateExpiredTime,
    },
  });

  const bank = useMemo(() => {
    return bankList?.find(bank => bank.shortName === form.values.bankId);
  }, [form.values.bankId, bankList]);

  function handleSubmit() {
    const validationResult = form.validate();
    if (validationResult.hasErrors) return;
    addCard({...form.values, atmId: bank.id}).then(onSubmit);
  }

  function handleMonthChange() {

  }

  return (<div className="flex items-center justify-center">
    <div
        className="flex flex-col justify-center items-center w-full bg-white border-[1px] mt-5 p-4 rounded-2xl">
      <div className="w-full md:flex">
        <div className="mb-5 w-6/12 max-h-[250px]">
          <ATMCard cardNumber={form.values.cardNumber}
                   cardHolder={form.values.holderName}
                   bankName={bank?.shortName}
                   logo={bank?.logo}
                   expiryDate={form.values.expired}
          />
        </div>

        <div className="w-full md:w-2/3 p-4">
          <div className="flex flex-col gap-4 mb-2">
            <div className={'flex items-center'}>
              <span className="w-1/4 text-right  text-md grow shrink-0 ">Chọn ngân hàng:</span>
              <Select
                  className="w-3/4 ml-4"
                  size={'md'}
                  data={Array.isArray(bankList) && bankList.map(item => item.shortName)}
                  {...form.getInputProps('bankId')}
              />
            </div>
            <div className={'flex items-center'}>
              <div className="w-1/4 text-right  text-md grow shrink-0 items-baseline">
                <span>Tên tài khoản:</span>
              </div>
              <TextInput
                  className="w-3/4 ml-4"
                  size={'md'}
                  {...form.getInputProps('holderName')}
              />
            </div>
            <div className={'flex items-center'}>
              <div className="w-1/4 text-right  text-md grow shrink-0 ">
                <span>Số thẻ:</span>
              </div>
              <TextInput
                  size={'md'}
                  maxLength={16}
                  className="w-3/4 ml-4"
                  {...form.getInputProps('cardNumber')}/></div>

            <div className={'flex items-center'}>
              <div className="w-1/4 text-right  text-md">
                <div className={'w-full'}>Ngày hết hạn:</div>
              </div>
              <div
                  className={'flex justify-between items-center border-1 py-2 px-1 rounded w-1/6 overflow-hidden ml-4'}>
                <div className={'w-full flex items-center'}>
                  <NumberInput max={12} min={1} className={'border-0 outline-0 text-center w-full'}
                               maxLength={2} hideControls/>
                  <div className={'border-t-1  border-gray-500 w-1/2 -rotate-[70deg]'}></div>
                  <NumberInput min className={'border-0 outline-0 text-center w-full'} hideControls maxLength={2}/>
                </div>
              </div>
            </div>


          </div>
        </div>

      </div>
      <Divider/>
      <div className="button-bottom w-full flex items-center transition-all justify-end mt-2">
        <Button
            className="px-2 rounded bg-green-500 hover:bg-green-600 font-bold ml-3 text-white"
            onClick={handleSubmit}
        >
          Cập nhật
        </Button>
      </div>
    </div>
  </div>);

};

export default AddAtmForm;
