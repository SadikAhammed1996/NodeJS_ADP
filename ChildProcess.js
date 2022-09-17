import fetch from 'node-fetch';

const data = await fetch('https://interview.adpeai.com/api/v2/get-task');
const json = await data.json();
const nameAndAmoutMap = new Map();
let name = '';
let amount = 0;
let alphaIds;

for (const iterator of json.transactions) {
    const date = new Date(iterator.timeStamp);
  if (date.getFullYear() === 2021) {
    if (nameAndAmoutMap.get(iterator.employee.name)) {
      const data = nameAndAmoutMap.get(iterator.employee.name);
      nameAndAmoutMap.set(iterator.employee.name, {
        salary: data.salary + iterator.amount,
        alphaIds:
          iterator.type === 'alpha'
            ? [...data.alphaIds, iterator.transactionID]
            : data.alphaIds,
      });
    } else
      nameAndAmoutMap.set(iterator.employee.name, {
        salary: iterator.amount,
        alphaIds: iterator.type === 'alpha' ? [iterator.transactionID] : [],
      });
  }
}

const entries = [...nameAndAmoutMap.entries()];

for (const [key, value] of entries) {
  if(value.salary > amount) {
      name = key;
      amount = value.salary;
      alphaIds = value.alphaIds;
  }
}

const postResponse = await fetch('https://interview.adpeai.com/api/v2/submit-task', {
    method: 'post',
    body: JSON.stringify({
        id: json.id,
        result: alphaIds
    })
})

process.send(
  `${name} is the highest earner of the year 2021 with an amount of ${amount} and the alpha transaction Ids of ${name} are:
  ${alphaIds}
  Post call response - ${postResponse}`
);
