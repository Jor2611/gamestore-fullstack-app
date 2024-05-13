const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Seed1715354750000 {
    name = 'Seed1715354750000'

    async up(queryRunner) {
        await queryRunner.query(`
          INSERT INTO genre("name", "label", "value", "icon") 
          VALUES
          ('Action','Action','action','https://media.rawg.io/media/games/f46/f466571d536f2e3ea9e815ad17177501.jpg'),
          ('Indie','Indie','indie','https://media.rawg.io/media/games/e04/e04963f3ac4c4fa83a1dc0b9231e50db.jpg'),
          ('Adventure','Adventure','adventure','https://media.rawg.io/media/games/fd8/fd882c8267a44621a0de6f9cec77ae90.jpg'),
          ('RPG','RPG','role-playing-games-rpg','https://media.rawg.io/media/games/62c/62c7c8b28a27b83680b22fb9d33fc619.jpg'),
          ('Strategy','Strategy','strategy','https://media.rawg.io/media/games/e4a/e4ab7f784bdc38c76ce6e4cef9715d18.jpg'),
          ('Shooter','Shooter','shooter','https://media.rawg.io/media/games/157/15742f2f67eacff546738e1ab5c19d20.jpg'),
          ('Casual','Casual','casual','https://media.rawg.io/media/games/11f/11fd681c312c14644ab360888dba3486.jpg'),
          ('Simulation','Simulation','simulation','https://media.rawg.io/media/games/6bc/6bc79f5bc023b1e6938f6eaf9926f073.jpg'),
          ('Puzzle','Puzzle','puzzle','https://media.rawg.io/media/games/7fa/7fa0b586293c5861ee32490e953a4996.jpg'),
          ('Arcade','Arcade','arcade','https://media.rawg.io/media/games/9fa/9fa63622543e5d4f6d99aa9d73b043de.jpg'),
          ('Platformer','Platformer','platformer','https://media.rawg.io/media/games/8a0/8a02f84a5916ede2f923b88d5f8217ba.jpg'),
          ('Racing','Racing','racing','https://media.rawg.io/media/games/082/082365507ff04d456c700157072d35db.jpg'),
          ('Massively Multiplayer','Massively Multiplayer','massively-multiplayer','https://media.rawg.io/media/games/4e0/4e0e7b6d6906a131307c94266e5c9a1c.jpg'),
          ('Sports','Sports','sports','https://media.rawg.io/media/screenshots/ddb/ddbcf3f1330e146094b0ce211e33090a.jpg'),
          ('Fighting','Fighting','fighting','https://media.rawg.io/media/games/91b/91be1a00c767f9e3d79353e505d7f85a.jpg'),
          ('Family','Family','family','https://media.rawg.io/media/games/793/79307648580a262f6cac402c3007efe0.jpg'),
          ('Board Games','Board Games','board-games','https://media.rawg.io/media/games/d3f/d3f9638e581b01d872bec784aaa9bdad.jpg'),
          ('Educational','Educational','educational','https://media.rawg.io/media/screenshots/6cd/6cd13ed3dcb6b44b8bc995850f2861e6.jpg'),
          ('Card','Card','card','https://media.rawg.io/media/games/431/4317e294e88e4c9d77327693b15f499a.jpg')
      `);

        await queryRunner.query(`
          INSERT INTO platform("name", "label", "value", "icon") 
          VALUES
          ('PC','PC','pc','https://media.rawg.io/media/games/7fa/7fa0b586293c5861ee32490e953a4996.jpg'),
          ('PlayStation 5','PlayStation 5','playstation5','https://media.rawg.io/media/games/eb5/eb514db62d397c64288160d5bd8fd67a.jpg'),
          ('PlayStation 4','PlayStation 4','playstation4','https://media.rawg.io/media/games/960/960b601d9541cec776c5fa42a00bf6c4.jpg'),
          ('Xbox One','Xbox One','xbox-one','https://media.rawg.io/media/games/562/562553814dd54e001a541e4ee83a591c.jpg'),
          ('Xbox Series S/X','Xbox Series S/X','xbox-series-x','https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg'),
          ('Nintendo Switch','Nintendo Switch','nintendo-switch','https://media.rawg.io/media/games/e04/e04963f3ac4c4fa83a1dc0b9231e50db.jpg'),
          ('iOS','iOS','ios','https://media.rawg.io/media/games/58a/58ac7f6569259dcc0b60b921869b19fc.jpg'),
          ('Android','Android','android','https://media.rawg.io/media/games/e74/e74458058b35e01c1ae3feeb39a3f724.jpg'),
          ('Nintendo 3DS','Nintendo 3DS','nintendo-3ds','https://media.rawg.io/media/games/e4f/e4fb3fd188f61fabec48dca22e6ef28a.jpg'),
          ('Nintendo DS','Nintendo DS','nintendo-ds','https://media.rawg.io/media/games/dc6/dc68ca77e06ad993aade7faf645f5ec2.jpg'),
          ('Nintendo DSi','Nintendo DSi','nintendo-dsi','https://media.rawg.io/media/screenshots/b45/b452e9b20e969a64d0088ae467d1dcab.jpg'),
          ('macOS','macOS','macos','https://media.rawg.io/media/games/7a2/7a2500ee8b2c0e1ff268bb4479463dea.jpg'),
          ('Linux','Linux','linux','https://media.rawg.io/media/games/6c5/6c55e22185876626881b76c11922b073.jpg'),
          ('Xbox 360','Xbox 360','xbox360','https://media.rawg.io/media/games/49c/49c3dfa4ce2f6f140cc4825868e858cb.jpg'),
          ('Xbox','Xbox','xbox-old','https://media.rawg.io/media/games/2ee/2eef5ed5e82c28d1299ecc2a0e60f2cb.jpg'),
          ('PlayStation 3','PlayStation 3','playstation3','https://media.rawg.io/media/games/8e4/8e4de3f54ac659e08a7ba6a2b731682a.jpg'),
          ('PlayStation 2','PlayStation 2','playstation2','https://media.rawg.io/media/games/233/233cdc08cce0228f6f35222eca3bff92.jpg'),
          ('PlayStation','PlayStation','playstation1','https://media.rawg.io/media/games/6c0/6c00ee85d1344f58c469e8e47fd8ae7c.jpg'),
          ('PS Vita','PS Vita','ps-vita','https://media.rawg.io/media/games/e4f/e4fb3fd188f61fabec48dca22e6ef28a.jpg'),
          ('PSP','PSP','psp','https://media.rawg.io/media/games/a6c/a6cd31267a20a615d35f618e766208fc.jpg'),
          ('Wii U','Wii U','wii-u','https://media.rawg.io/media/games/c47/c4796c4c49e7e06ad328e07aa8944cdd.jpg'),
          ('Wii','Wii','wii','https://media.rawg.io/media/screenshots/157/1571cdfb52888191eabaf53c2b897240.jpg'),
          ('GameCube','GameCube','gamecube','https://media.rawg.io/media/games/d26/d263d8d035027185193ddd253a6e3479.jpg'),
          ('Nintendo 64','Nintendo 64','nintendo-64','https://media.rawg.io/media/screenshots/4cf/4cf1e2b4cd701605225fb443d5e84f77.jpg'),
          ('Game Boy Advance','Game Boy Advance','game-boy-advance','https://media.rawg.io/media/games/35f/35f815a22c4678b4fe76073f0f56df8e.jpg'),
          ('Game Boy Color','Game Boy Color','game-boy-color','https://media.rawg.io/media/games/7ca/7ca0df41799243443a4e3887720fdf2a.jpg'),
          ('Game Boy','Game Boy','game-boy','https://media.rawg.io/media/games/e40/e4043e92866d08ec9fdd212dcd3a1224.jpg'),
          ('SNES','SNES','snes','https://media.rawg.io/media/screenshots/f7a/f7a70f1b271de9b92a9714db33e4c8ba.jpg'),
          ('NES','NES','nes','https://media.rawg.io/media/games/a9a/a9a2472f862b041d2980103ddbb61c91.jpg'),
          ('Classic Macintosh','Classic Macintosh','macintosh','https://media.rawg.io/media/games/14a/14a83c56ff668baaced6e8c8704b6391.jpg'),
          ('Apple II','Apple II','apple-ii','https://media.rawg.io/media/screenshots/ed5/ed5d628f77ca3d2c16f041fe1267f224.jpg'),
          ('Commodore / Amiga','Commodore / Amiga','commodore-amiga','https://media.rawg.io/media/games/637/637d7dc2f44d0f6ddd3ee2c0b1366962.jpg'),
          ('Atari 7800','Atari 7800','atari-7800','https://media.rawg.io/media/screenshots/565/56504b28b184dbc630a7de118e39d822.jpg'),
          ('Atari 5200','Atari 5200','atari-5200','https://media.rawg.io/media/screenshots/678/6786598cba3939d48ed60cbd1a3723f4.jpg'),
          ('Atari 2600','Atari 2600','atari-2600','https://media.rawg.io/media/screenshots/b12/b12ed274eed80e4aced37badf228d1cf.jpg'),
          ('Atari Flashback','Atari Flashback','atari-flashback','https://media.rawg.io/media/screenshots/2aa/2aa07f58491e14b0183333f8956bc802.jpg'),
          ('Atari 8-bit','Atari 8-bit','atari-8-bit','https://media.rawg.io/media/screenshots/038/0385a47d3a43b218204268af5361a19e.jpg'),
          ('Atari ST','Atari ST','atari-st','https://media.rawg.io/media/games/7b5/7b58d09f57803a5805b13d6c4f4020d6.jpg'),
          ('Atari Lynx','Atari Lynx','atari-lynx','https://media.rawg.io/media/screenshots/d71/d71b68d3f6b1810bc9d64d7aea746d30.jpg'),
          ('Atari XEGS','Atari XEGS','atari-xegs','https://media.rawg.io/media/screenshots/769/7691726d70c23c029903df08858df001.jpg'),
          ('Genesis','Genesis','genesis','https://media.rawg.io/media/screenshots/d93/d93268b78fd61979a9c80133082185a3.jpg'),
          ('SEGA Saturn','SEGA Saturn','sega-saturn','https://media.rawg.io/media/screenshots/fe0/fe0ccce931cdb5aaff9500a331e5c2eb.jpg'),
          ('SEGA CD','SEGA CD','sega-cd','https://media.rawg.io/media/screenshots/b3e/b3e41d90f811a8a153fc30bdd6cefc92.jpg'),
          ('SEGA 32X','SEGA 32X','sega-32x','https://media.rawg.io/media/screenshots/d9f/d9f308b5d824ae8f047edc0a998a587b.jpg'),
          ('SEGA Master System','SEGA Master System','sega-master-system','https://media.rawg.io/media/screenshots/901/901054a0ec26e08fee47ab7bffdb1ce8.jpg'),
          ('Dreamcast','Dreamcast','dreamcast','https://media.rawg.io/media/games/5b4/5b4af50ce68cf94dcab24f3dba33eaab.jpg'),
          ('3DO','3DO','3do','https://media.rawg.io/media/screenshots/d8c/d8c399c09701ae2603043a3bb3a0bff5.jpg'),
          ('Jaguar','Jaguar','jaguar','https://media.rawg.io/media/screenshots/241/24188738ed8141b03c767e6bbba28401.jpg'),
          ('Game Gear','Game Gear','game-gear','https://media.rawg.io/media/games/2c3/2c3363eb1ae202b9e4e7520d3f14ab2e.jpg'),
          ('Neo Geo','Neo Geo','neogeo','https://media.rawg.io/media/screenshots/2e0/2e03467b69eb929e6f7aed34fd720e76.jpg')
      `);
    }

    async down(queryRunner) {}
}