import chair from '../../../assets/images/chair.png';
import { DayPicker } from 'react-day-picker';

const AppoinmentBanner = ({ selectedDate, setSelectedDate }) => {

    return (
        <header>
            <div className="hero">
                <div className="hero-content flex-col xl:flex-row">
                    <img src={chair} alt="dentist chair" />
                    <div className="daypicher">
                        <DayPicker
                            mode='single'
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppoinmentBanner;