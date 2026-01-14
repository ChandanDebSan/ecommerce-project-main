export const deliverOptions = [{
  id : '1',
  deliveryDays: 7,
  priceCents : 0
},
{
    id : '2',
  deliveryDays: 3,
  priceCents : 499
},
{
  id : '3',
  deliveryDays: 1,
  priceCents : 999
}];

export function getDeliveryOption(deliverOptionID){
  let deliverOption;

    deliverOptions.forEach((option) => {
      if (option.id === deliverOptionID) deliverOption = option;
    });

    return deliverOption || deliverOptions[0];
}