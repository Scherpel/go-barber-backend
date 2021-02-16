import { Router, request, response } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();
const createRepository = new CreateAppointmentService(appointmentsRepository);

appointmentsRouter.get('/', (request, response) =>{
  const appointments = appointmentsRepository.all();
  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  try{
    const { provider, date } = request.body;
    const parsedDate = parseISO(date);
    const appointment = createRepository.execute({ provider, date: parsedDate })

    return response.json(appointment);
  } catch(err) {
    return response.status(400).json({message: err.message});

  }
});

export default appointmentsRouter;

