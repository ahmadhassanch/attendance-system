import { join } from 'path';
import { Prisma, PrismaClient } from '@prisma/client';
// import { MakeTimedIDUnique } from 'src/common/common.helper';

async function main() {
  const prisma = new PrismaClient();
  // console.log('hello world');
  
  // getActiveRMSAdmission
  // let result = await prisma.rMSAdmission.findFirst({
  //   select: { 
  //     rmsAdmissionId: true 
  //   },
  //   where: { 
  //     patientId: 'd1e50068-1d22-4456-aa8d-a4ee6720667d',
  //     dischargeDate: null

  //   },
  // });
  


  // addOrderableValue
  // let result = await prisma.orderableValue.findFirst({
  //   select: { 
  //     orderableValueId: true, 
  //     isLive: true, 
  //     cmFile: true, 
  //   },
  //   where: { 
  //     deviceInventoryId: 'G6LYJRYVE1',
  //     patientId: 'd1e50068-1d22-4456-aa8d-a4ee6720667d'
  //   },
  // });

  // let created = false;

  // if (result === null) {
  //   created = true;

  //   result = await prisma.orderableValue.create({      
  //     select: { 
  //       orderableValueId: true, 
  //       isLive: true, 
  //       cmFile: true, 
  //     },
  //     data: { 
  //       orderableValueId: 'CJBSHYUCGYEVY', 
  //       orderableId: '1',
  //       patientId: 'd1e50068-1d22-4456-aa8d-a4ee6720667d',
  //       deviceInventoryId: 'G6LYJRYVE1',
  //       readingTime: 123,
  //       isLive: true, 
  //       cmFile: 'file_url', 
  //     }
  //   });
  // }
  
  // console.log(result);
  // console.log('Created: ', created);


  // getOrderableResultablesFromOrder
  let result = await prisma.rMSOrder.findFirst({
      select: {
        orderableId: true, 
        orderable: {
          select: {
            orderableToResultable: {
              select: {
                resultable: {
                  select: {
                    key: true
                  }
                }
              } 
            }
          }
        }, 
      },
      where: { 
        rmsAdmissionId: '08b5f337-e78c-4d20-b17e-82a546638cb5',
        deviceInventoryId: 'G6LYJRYVE1',
        isDeleted: false
      },
    });

  //   let resultableArray: string[] = []

  //   result.orderable.orderableToResultable.forEach(item => {resultableArray.push(item.resultable.key)});

    console.log(result.orderableId);
    console.dir(result, { depth: Infinity });


}
main();
