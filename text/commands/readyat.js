module.exports = {
    name: 'readyat',
    alt: 'readysoon',
    param: 'time',
    secret: false,
    description: "Declares yourself as ready, but in the future",
    execute(message, args, bot)
    {
        command = args.shift();

        if (command === undefined)
        {
            message.channel.send('Try entering a time (HH:MM).');
        }
        else if (command === 'cancel')
        {
            if (bot.readySoon.get(message.member.id) != undefined)
            {
                let minutes = bot.readySoon.get(message.member.id)[2]
                let hours = bot.readySoon.get(message.member.id)[1]

                if (minutes < 10)
                {
                    message.channel.send(message.member.displayName + ' will no longer be ready at ' + hours + ':0' + minutes);
                }
                else
                {
                    message.channel.send(message.member.displayName + ' will no longer be ready at ' + hours + ':' + minutes);
                }

                bot.readySoon.delete(message.member.id);
            }
        }
        //try to parse it
        else 
        {
            let digits = command.replace(/\D/g, '');

            let atMinutes = digits % 100;
            let atHours = (digits - atMinutes) / 100;

            let date = new Date();

            let currentMinutes = date.getMinutes();
            let currentHours = date.getHours();

//------------------------------------------------------------------
            if (atHours > 24)
            {
                atHours %= 24;
            }

            command = args.shift();

            if (command === undefined)
            {

            }
            else if (command === 'am')
            {

            }
            else if (command === 'pm')
            {

            }
            else 
            {

            }
            

            //the amount of milliseconds between now and the goal
            let totMillis = 0;


//--------------------------------------------------------------------

            bot.readySoon.set(message.member.id, [message.member.id, atHours, atMinutes]);

            message.react('✅');

            let out = 'I\'ve got you marked down for ';

            if (atHours > 12)
            {
                atHours -= 12;
            }

            out += atHours + ':';

            if (atMinutes < 10)
            {
                out += '0';
            }

            out += atMinutes;

            if (atPm)
            {
                out += 'pm';
            }
            else
            {
                out += 'am';
            }

            message.channel.send(out);

            setTimeout(function ()
            {
                let atMinutes = bot.readySoon.get(message.member.id)[2];
                let atHours = bot.readySoon.get(message.member.id)[1];

                let date = new Date();

                let currentMinutes = date.getMinutes();
                let currentHours = date.getHours();

                if (bot.readySoon.get(message.member.id) != undefined && atMinutes === currentMinutes && atHours === currentHours)
                {
                    message.channel.send('Are ya ready yet, ' + `<@${message.member.id}>` + '?');
                    bot.readySoon.delete(message.member.id);
                }
            }, totMillis);
        }
    }
}