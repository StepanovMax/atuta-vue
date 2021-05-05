import db from '../server/models/index.js';
import cron from 'node-cron';

const Item = db.item;

const moveActiveToExpired = () => {
  // Every 24 hours at midnight.
  const periodEveryMinute = '* * * * *';
  const periodEveryDayAtMidnight = '0 0 0 * * *';
  cron.schedule(periodEveryDayAtMidnight, function() {

    try {
      const timestampNow = new Date().getTime() / 1000 | 0;
      const timestamp24hours = 24 * 60 * 60;
      const timestamp30days = 30 * timestamp24hours;
      const timestampMonthAgo = timestampNow - timestamp30days;
      // Find objects in DB.
      Item.findAll({
        order: [['createdDate', 'DESC']]
      })
        .then(
          objects => {
            objects.forEach(
              item => {
                if (item.tarifExpiredDate < timestampMonthAgo) {
                  const data = {
                    status: 'completed',
                  };

                  item.update(data).then(
                    self => {
                      // console.log('   >> Cron item has been updated ::');
                    }
                  );

                }
              }
            );
          }
        );
    } catch(error) {
      console.error('Error / backend / cron / expire date ::', error);
    }
  });
}

export { moveActiveToExpired };
