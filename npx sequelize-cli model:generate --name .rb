npx sequelize-cli model:generate --name DoctorProfiles --attributes specialization:string,availableFrom:date,availableTo:date,slotDurationInMinutes:number,user_id:uuid
npx sequelize-cli model:generate --name Appointment --attributes slotTime:date,status:string,notes:string,doctorId:uuid,patientId :uuid
npx sequelize-cli model:generate --name Queues --attributes position:number,status:string,status:string,actualStartTime:date,actualEndTime:date,appointmentId:uuid,,doctorId:uuid
npx sequelize-cli model:generate --name Appointment --attributes action:string,reason:string,queueId:uuid,actionBy:uuid
npx sequelize-cli model:generate --name QueueLog --attributes statusBefore:string,statusAfter:string,queueChangeReason:string,queueId:uuid,changedBy:uuid




