        console.log('🚀 FLAP JavaScript завантажується...');
        
        // Global state
        let currentUser = null;
        let currentRating = 0;
        let currentMatchScore = { green: 2, blue: 1 };
        let coins = 250;
        let videoRatings = {}; // Store current rating values
        
        // Test function availability on page load
        document.addEventListener('DOMContentLoaded', function() {
            console.log('📄 DOM завантажено');
            console.log('🔍 Перевірка функцій:');
            console.log('- handleQuickLogin:', typeof handleQuickLogin);
            console.log('- handleQuickRegister:', typeof handleQuickRegister);
            console.log('- switchAuthMode:', typeof switchAuthMode);
            
            console.log('🔍 Перевірка елементів:');
            console.log('- authScreen:', !!document.getElementById('authScreen'));
            console.log('- mainScreen:', !!document.getElementById('mainScreen'));
            
            // Add test button for debugging
            const testBtn = document.createElement('button');
            testBtn.textContent = '🧪 ТЕСТ ВХОДУ';
            testBtn.style.position = 'fixed';
            testBtn.style.top = '10px';
            testBtn.style.right = '10px';
            testBtn.style.zIndex = '9999';
            testBtn.style.padding = '10px';
            testBtn.style.background = 'red';
            testBtn.style.color = 'white';
            testBtn.style.border = 'none';
            testBtn.style.borderRadius = '5px';
            testBtn.onclick = function() {
                console.log('🧪 Тестовий вхід');
                if (typeof handleQuickLogin === 'function') {
                    handleQuickLogin();
                } else {
                    alert('❌ handleQuickLogin не знайдена!');
                }
            };
            document.body.appendChild(testBtn);
        });

        // Team names for auto-balance
        const teamNames = [
            ["⚡ Блискавки", "🔥 Вогняні"],
            ["🦅 Орли", "🐺 Вовки"], 
            ["⭐ Зірки", "💎 Діаманти"],
            ["🚀 Ракети", "⚔️ Воїни"],
            ["🏆 Чемпіони", "👑 Королі"],
            ["🌟 Легенди", "🔱 Титани"]
        ];

        // Video categories data
        const videoCategories = {
            'all': {
                videos: [
                                { id: 'video1', title: 'Кращий фінт тижня', author: 'Андрій Коваленко', city: 'Київ', position: 'Півзахисник', rating: 4.1, category: 'tricks' },
            { id: 'video2', title: 'Точність ударів', author: 'Петро Мельник', city: 'Львів', position: 'Нападник', rating: 4.2, category: 'accuracy' },
            { id: 'video3', title: 'Швидкісний дриблінг', author: 'Дмитро Коваленко', city: 'Одеса', position: 'Воротар', rating: 3.8, category: 'speed' },
            { id: 'video4', title: 'Неймовірний сейв', author: 'Олексій Шевченко', city: 'Харків', position: 'Воротар', rating: 4.5, category: 'top' },
            { id: 'video5', title: 'Технічний удар', author: 'Максим Зінченко', city: 'Дніпро', position: 'Півзахисник', rating: 3.7, category: 'accuracy' }
                ]
            }
        };

        // Update vote value display
        function updateVoteValue(videoId, value) {
            const ratingValue = parseFloat(value);
            document.getElementById('vote_' + videoId).textContent = ratingValue.toFixed(2);
            videoRatings[videoId] = ratingValue;
        }

        // Video voting with button and disabled slider
        function voteForVideo(videoId, event) {
            event.stopPropagation();
            
            const ratingValue = videoRatings[videoId] || 0;
            
            if (ratingValue === 0) {
                showToast('❌ Оберіть оцінку на повзунку!', 'error');
                return;
            }
            
            // Disable slider and button after voting
            const slider = document.querySelector(`input[onchange*="${videoId}"]`);
            const button = event.target;
            if (slider) slider.disabled = true;
            button.disabled = true;
            button.textContent = 'Проголосовано';
            button.style.background = '#666';
            
            showToast(`⭐ Голос ${ratingValue.toFixed(2)} відправлено!`, 'success');
            
            // Show rating change animation
            setTimeout(() => {
                showRatingChange('+0.1', '#4caf50');
            }, 1000);
        }

        // Show rating change
        function showRatingChange(change, color) {
            const toast = document.createElement('div');
            toast.style.cssText = `
                position: fixed;
                top: 60px;
                right: 20px;
                background: ${color};
                color: white;
                padding: 8px 15px;
                border-radius: 20px;
                font-weight: 700;
                font-size: 14px;
                z-index: 2000;
                transform: translateX(300px);
                transition: all 0.5s ease;
            `;
            toast.textContent = `Рейтинг ${change}`;
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.style.transform = 'translateX(0)';
            }, 100);
            
            setTimeout(() => {
                toast.style.transform = 'translateX(300px)';
                setTimeout(() => document.body.removeChild(toast), 500);
            }, 2000);
        }

        // Video filters with actual changes
        function filterVideos(type) {
            document.querySelectorAll('.video-filter').forEach(btn => {
                btn.classList.remove('active');
                btn.style.background = 'rgba(255,255,255,0.1)';
                btn.style.borderColor = 'rgba(255,255,255,0.3)';
                btn.style.color = 'white';
            });
            
            event.target.classList.add('active');
            event.target.style.background = 'rgba(76, 175, 80, 0.2)';
            event.target.style.borderColor = '#4caf50';
            event.target.style.color = '#2e7d32';
            
            // Simulate video content change
            const videoContainer = document.querySelector('#videos');
            const currentVideos = videoContainer.querySelectorAll('.challenge-video-item');
            
            currentVideos.forEach((video, index) => {
                video.style.opacity = '0.3';
                video.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    video.style.opacity = '1';
                    video.style.transform = 'scale(1)';
                    
                    // Change video titles based on filter
                    const titleElement = video.querySelector('.challenge-video-title');
                    const authorElement = video.querySelector('strong');
                    
                    switch(type) {
                        case 'tricks':
                            titleElement.textContent = index === 0 ? 'Неймовірний фінт' : 'Технічний трюк';
                            authorElement.textContent = index === 0 ? 'Віталій Фінтер' : 'Олег Технік';
                            break;
                        case 'accuracy':
                            titleElement.textContent = index === 0 ? 'Супер точність' : 'Влучний удар';
                            authorElement.textContent = index === 0 ? 'Андрій Снайпер' : 'Максим Влучник';
                            break;
                        case 'speed':
                            titleElement.textContent = index === 0 ? 'Швидкість блискавки' : 'Рекордний час';
                            authorElement.textContent = index === 0 ? 'Олександр Швидкий' : 'Петро Рекорд';
                            break;
                        case 'city':
                            titleElement.textContent = index === 0 ? 'Відео з Києва' : 'Львівський майстер';
                            authorElement.textContent = index === 0 ? 'Київський Гравець' : 'Львівський Про';
                            break;
                        case 'rating':
                            titleElement.textContent = index === 0 ? 'Топ рейтинг 4.9' : 'Високий рейтинг 4.7';
                            authorElement.textContent = index === 0 ? 'Зірка ⭐4.9' : 'Майстер ⭐4.7';
                            break;
                        case 'popular':
                            titleElement.textContent = index === 0 ? '🔥 Вірусне відео' : '📈 Трендове відео';
                            authorElement.textContent = index === 0 ? 'Вірусний Блогер' : 'Популярний Гравець';
                            break;
                        default:
                            titleElement.textContent = index === 0 ? 'Кращий фінт тижня' : 'Точність ударів';
                            authorElement.textContent = index === 0 ? 'Андрій Коваленко' : 'Петро Мельник';
                    }
                }, index * 200);
            });
            
            const filters = {
                'all': '🌟 Показано всі відео',
                'tricks': '🎯 Показано тільки фінти',
                'accuracy': '⚽ Показано відео точності',
                'speed': '🏃 Показано швидкісні відео',
                'city': '🏙️ Фільтр по містах',
                'rating': '⭐ Показано відео з рейтингом 4.5+',
                'popular': '🔥 Показано популярні відео'
            };
            
            showToast(filters[type], 'success');
        }

        // Better search with city and rating filters
        function searchVideos(query) {
            if (query.length > 2) {
                const isCity = ['київ', 'львів', 'одеса', 'харків', 'дніпро'].some(city => 
                    query.toLowerCase().includes(city)
                );
                const isRating = query.includes('4.') || query.includes('5.') || query.includes('рейтинг');
                
                if (isCity) {
                    showToast(`🏙️ Фільтр по місту: "${query}"`, 'success');
                } else if (isRating) {
                    showToast(`⭐ Фільтр по рейтингу: "${query}"`, 'success');
                } else {
                    showToast(`🔍 Пошук: "${query}"`, 'success');
                }
            }
        }

        // Enhanced player profiles with different avatars
        function showPlayerProfile(playerId) {
            const players = {
                'andriy_kovalenka': {
                    avatar: '🎯',
                    name: 'Андрій Коваленко',
                    position: 'Півзахисник • Київ • 24 роки',
                    rating: '4.8',
                    matches: '89',
                    winRate: '91%',
                    goals: '45',
                    contact: {
                        phone: '+380501234567',
                        telegram: '@andriy_football',
                        instagram: '@andriy.football.kiev'
                    }
                },
                'petro_melnyk': {
                    avatar: '⚽',
                    name: 'Петро Мельник',
                    position: 'Нападник • Львів • 23 роки',
                    rating: '4.9',
                    matches: '67',
                    winRate: '88%',
                    goals: '89',
                    contact: {
                        phone: '+380671234567',
                        telegram: '@petro_striker',
                        instagram: '@petro.goals.lviv'
                    }
                },
                'oleg_semenko': {
                    avatar: '⚡',
                    name: 'Олег Семенов',
                    position: 'Універсал • Одеса • 26 років',
                    rating: '4.6',
                    matches: '54',
                    winRate: '85%',
                    goals: '32',
                    contact: {
                        phone: '+380481234567',
                        telegram: '@oleg_fast',
                        instagram: '@oleg.speed.odesa'
                    }
                },
                'maksym_petrenka': {
                    avatar: '🏃',
                    name: 'Максим Петренко',
                    position: 'Нападник • Харків • 22 роки',
                    rating: '4.7',
                    matches: '76',
                    winRate: '89%',
                    goals: '95',
                    contact: {
                        phone: '+380571234567',
                        telegram: '@maksym_goal',
                        instagram: '@maksym.striker.kharkiv'
                    }
                },
                'viktor_shevchenko': {
                    avatar: '🛡️',
                    name: 'Віктор Шевченко',
                    position: 'Захисник • Дніпро • 28 років',
                    rating: '4.5',
                    matches: '102',
                    winRate: '87%',
                    goals: '12',
                    contact: {
                        phone: '+380561234567',
                        telegram: '@viktor_def',
                        instagram: '@viktor.defense.dnipro'
                    }
                },
                'dmitro_kovalenko': {
                    avatar: '🥅',
                    name: 'Дмитро Коваленко',
                    position: 'Воротар • Одеса • 27 років',
                    rating: '4.7',
                    matches: '56',
                    winRate: '85%',
                    goals: '2',
                    contact: {
                        phone: '+380931234567',
                        telegram: '@dmitro_keeper',
                        instagram: '@dmitro.saves.odesa'
                    }
                },
                'oleksandr_m': {
                    avatar: '🚀',
                    name: 'Олександр Мельник',
                    position: 'Нападник • Київ • 25 років',
                    rating: '4.9',
                    matches: '78',
                    winRate: '92%',
                    goals: '67',
                    contact: {
                        phone: '+380631234567',
                        telegram: '@oleksandr_speed',
                        instagram: '@oleksandr.rocket.kyiv'
                    }
                }
            };

            const player = players[playerId] || players['andriy_k'];
            
            document.getElementById('profileAvatar').textContent = player.avatar;
            document.getElementById('profileName').textContent = player.name;
            document.getElementById('profilePosition').textContent = player.position;
            document.getElementById('profileRating').textContent = player.rating;
            document.getElementById('profileMatches').textContent = player.matches;
            document.getElementById('profileWinRate').textContent = player.winRate;
            document.getElementById('profileGoals').textContent = player.goals;
            
            // Update contact info
            document.querySelector('[onclick="copyContact(\'+380501234567\')"]').setAttribute('onclick', `copyContact('${player.contact.phone}')`);
            document.querySelector('[onclick="copyContact(\'+380501234567\')"]').previousElementSibling.textContent = player.contact.phone;
            
            document.querySelector('[onclick="copyContact(\'@maksym_football\')"]').setAttribute('onclick', `copyContact('${player.contact.telegram}')`);
            document.querySelector('[onclick="copyContact(\'@maksym_football\')"]').previousElementSibling.textContent = player.contact.telegram;
            
            document.querySelector('[onclick="copyContact(\'@maksym.football.kyiv\')"]').setAttribute('onclick', `copyContact('${player.contact.instagram}')`);
            document.querySelector('[onclick="copyContact(\'@maksym.football.kyiv\')"]').previousElementSibling.textContent = player.contact.instagram;
            
            document.getElementById('playerProfileModal').classList.add('show');
        }

        // Challenge creation functions
        function showCreateChallenge() {
            document.getElementById('createChallengeModal').classList.add('show');
        }

        function calculatePrizePool(contribution) {
            const estimatedParticipants = 10; // Приблизна кількість учасників
            const prizePool = contribution * estimatedParticipants;
            document.getElementById('prizePoolDisplay').textContent = prizePool + '₴';
        }

        function closeCreateChallenge() {
            document.getElementById('createChallengeModal').classList.remove('show');
        }

        function toggleInvite(type) {
            const btn = event.target;
            if (btn.style.background === 'rgb(76, 175, 80)') {
                btn.style.background = '#f5f5f5';
                btn.style.color = '#333';
            } else {
                btn.style.background = '#4caf50';
                btn.style.color = 'white';
            }
        }

        function createChallenge(event) {
            event.preventDefault();
            closeCreateChallenge();
            showToast('🏆 Челендж створено!', 'success');
            event.target.reset();
            // Reset invite buttons
            document.querySelectorAll('.invite-btn').forEach(btn => {
                btn.style.background = '#f5f5f5';
                btn.style.color = '#333';
            });
        }

        // Challenge participation
        function joinChallenge(challengeId) {
            document.getElementById('challengeParticipateModal').classList.add('show');
        }

        function closeChallengeParticipate() {
            document.getElementById('challengeParticipateModal').classList.remove('show');
        }

        function submitChallengeVideo(event) {
            event.preventDefault();
            closeChallengeParticipate();
            showToast('📹 Відео завантажено! +20 монет', 'success');
            addCoins(20); // +20 за прийняття виклику та завантаження
            event.target.reset();
        }



        // Enhanced end match with multiple player ratings
        function endMatch() {
            document.getElementById('scoreInstructions').innerHTML = '🏁 Матч завершено! Тепер оцініть всіх гравців з вашої команди';
            showToast('🏁 Матч завершено! Оцініть гравців зі своєї команди', 'success');
            setTimeout(() => {
                showRatingModal('oleksandr_m');
            }, 1500);
        }

        // Enhanced rating with change display
        function submitRating() {
            if (currentRating === 0) {
                showToast('⭐ Оберіть рейтинг!', 'error');
                return;
            }
            
            document.getElementById('ratingModal').classList.remove('show');
            showToast(`⭐ Рейтинг ${currentRating.toFixed(2)}/5 відправлено!`, 'success');
            
            // Show rating changes
            setTimeout(() => {
                if (currentRating >= 4.0) {
                    showRatingChange('+0.2', '#4caf50');
                } else if (currentRating >= 2.5) {
                    showRatingChange('+0.1', '#ff9800');
                } else {
                    showRatingChange('-0.1', '#f44336');
                }
            }, 1000);
            
            currentRating = 0;
            
            // Reset rating form
            document.getElementById('playerRatingValue').textContent = '0.0';
            document.getElementById('ratingStars').textContent = '☆☆☆☆☆';
            document.getElementById('ratingStars').style.color = '#ddd';
        }

        // Store and subscription functions
        function showStore() {
            console.log('showStore called');
            document.getElementById('storeModal').style.display = 'flex';
            const storeContent = `
                <div style="max-height: 70vh; overflow-y: auto;">
                    <h3 style="text-align: center; margin-bottom: 20px; color: #2e7d32;">🛒 Магазин FLAP</h3>
                    
                    <!-- Бустери -->
                    <div style="margin-bottom: 25px;">
                        <h4 style="color: #4caf50; margin-bottom: 15px; display: flex; align-items: center; gap: 8px;">
                            🚀 Бустери
                        </h4>
                        <div style="display: grid; gap: 10px;">
                            <div style="background: #f8f9fa; padding: 12px; border-radius: 10px; display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-weight: 600; font-size: 14px;">⚡ Подвійний досвід</div>
                                    <div style="font-size: 12px; color: #666;">x2 досвід за матчі (24 години)</div>
                                </div>
                                <button onclick="buyItem('double_xp', 50)" style="background: #4caf50; color: white; border: none; padding: 6px 12px; border-radius: 6px; font-size: 12px; cursor: pointer;">50 💰</button>
                            </div>
                            <div style="background: #f8f9fa; padding: 12px; border-radius: 10px; display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-weight: 600; font-size: 14px;">🎯 Точність+</div>
                                    <div style="font-size: 12px; color: #666;">+0.2 до рейтингу точності (7 днів)</div>
                                </div>
                                <button onclick="buyItem('accuracy_boost', 100)" style="background: #4caf50; color: white; border: none; padding: 6px 12px; border-radius: 6px; font-size: 12px; cursor: pointer;">100 💰</button>
                            </div>
                            <div style="background: #f8f9fa; padding: 12px; border-radius: 10px; display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-weight: 600; font-size: 14px;">💪 Витривалість</div>
                                    <div style="font-size: 12px; color: #666;">Менше втоми в матчах (3 дні)</div>
                                </div>
                                <button onclick="buyItem('stamina_boost', 75)" style="background: #4caf50; color: white; border: none; padding: 6px 12px; border-radius: 6px; font-size: 12px; cursor: pointer;">75 💰</button>
                            </div>
                        </div>
                    </div>

                    <!-- Бейджі -->
                    <div style="margin-bottom: 25px;">
                        <h4 style="color: #ff9800; margin-bottom: 15px; display: flex; align-items: center; gap: 8px;">
                            🏅 Бейджі
                        </h4>
                        <div style="display: grid; gap: 10px;">
                            <div style="background: #f8f9fa; padding: 12px; border-radius: 10px; display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-weight: 600; font-size: 14px;">👑 VIP Гравець</div>
                                    <div style="font-size: 12px; color: #666;">Золотий значок біля імені</div>
                                </div>
                                <button onclick="buyItem('vip_badge', 200)" style="background: #ff9800; color: white; border: none; padding: 6px 12px; border-radius: 6px; font-size: 12px; cursor: pointer;">200 💰</button>
                            </div>
                            <div style="background: #f8f9fa; padding: 12px; border-radius: 10px; display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-weight: 600; font-size: 14px;">⚽ Король Голів</div>
                                    <div style="font-size: 12px; color: #666;">Для гравців з 100+ голами</div>
                                </div>
                                <button onclick="buyItem('goal_king', 150)" style="background: #ff9800; color: white; border: none; padding: 6px 12px; border-radius: 6px; font-size: 12px; cursor: pointer;">150 💰</button>
                            </div>
                            <div style="background: #f8f9fa; padding: 12px; border-radius: 10px; display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-weight: 600; font-size: 14px;">🛡️ Стіна</div>
                                    <div style="font-size: 12px; color: #666;">Для захисників з 90%+ перехоплень</div>
                                </div>
                                <button onclick="buyItem('wall_badge', 120)" style="background: #ff9800; color: white; border: none; padding: 6px 12px; border-radius: 6px; font-size: 12px; cursor: pointer;">120 💰</button>
                            </div>
                        </div>
                    </div>

                    <!-- Емоції -->
                    <div style="margin-bottom: 20px;">
                        <h4 style="color: #9c27b0; margin-bottom: 15px; display: flex; align-items: center; gap: 8px;">
                            😄 Емоції
                        </h4>
                        <div style="display: grid; gap: 10px;">
                            <div style="background: #f8f9fa; padding: 12px; border-radius: 10px; display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-weight: 600; font-size: 14px;">🔥 Пакет "Вогонь"</div>
                                    <div style="font-size: 12px; color: #666;">5 унікальних емоцій для чату</div>
                                </div>
                                <button onclick="buyItem('fire_emotes', 80)" style="background: #9c27b0; color: white; border: none; padding: 6px 12px; border-radius: 6px; font-size: 12px; cursor: pointer;">80 💰</button>
                            </div>
                            <div style="background: #f8f9fa; padding: 12px; border-radius: 10px; display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-weight: 600; font-size: 14px;">⚽ Футбольні емоції</div>
                                    <div style="font-size: 12px; color: #666;">Гол, офсайд, червона картка та інші</div>
                                </div>
                                <button onclick="buyItem('football_emotes', 60)" style="background: #9c27b0; color: white; border: none; padding: 6px 12px; border-radius: 6px; font-size: 12px; cursor: pointer;">60 💰</button>
                            </div>
                            <div style="background: #f8f9fa; padding: 12px; border-radius: 10px; display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-weight: 600; font-size: 14px;">🎉 Святкові</div>
                                    <div style="font-size: 12px; color: #666;">Емоції для перемог та свят</div>
                                </div>
                                <button onclick="buyItem('celebration_emotes', 40)" style="background: #9c27b0; color: white; border: none; padding: 6px 12px; border-radius: 6px; font-size: 12px; cursor: pointer;">40 💰</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Create and show store modal
            let storeModal = document.getElementById('storeModal');
            if (!storeModal) {
                storeModal = document.createElement('div');
                storeModal.id = 'storeModal';
                storeModal.className = 'rating-modal';
                storeModal.innerHTML = `
                    <div class="rating-content" style="max-width: 450px;">
                        <div class="rating-title">🛒 Магазин</div>
                        <div id="storeContent">${storeContent}</div>
                        <div class="rating-buttons">
                            <button onclick="closeStore()" class="rating-btn skip">Закрити</button>
                        </div>
                    </div>
                `;
                document.body.appendChild(storeModal);
            } else {
                document.getElementById('storeContent').innerHTML = storeContent;
            }
            
            storeModal.classList.add('show');
        }

        function closeStore() {
            document.getElementById('storeModal').style.display = 'none';
        }

        function buyItem(itemId, price) {
            if (coins >= price) {
                coins -= price;
                document.getElementById('coinCount').textContent = coins;
                
                const items = {
                    'double_xp': '⚡ Подвійний досвід активовано на 24 години!',
                    'accuracy_boost': '🎯 Бустер точності активовано на 7 днів!',
                    'stamina_boost': '💪 Бустер витривалості активовано на 3 дні!',
                    'vip_badge': '👑 VIP значок додано до профілю!',
                    'goal_king': '⚽ Бейдж "Король Голів" отримано!',
                    'wall_badge': '🛡️ Бейдж "Стіна" отримано!',
                    'fire_emotes': '🔥 Пакет емоцій "Вогонь" розблоковано!',
                    'football_emotes': '⚽ Футбольні емоції додано!',
                    'celebration_emotes': '🎉 Святкові емоції розблоковано!'
                };
                
                showToast(items[itemId] || 'Предмет куплено!', 'success');
            } else {
                showToast('❌ Недостатньо монет!', 'error');
            }
        }

        function showSubscriptions() {
            document.getElementById('subscriptionsModal').style.display = 'flex';
        }

        function closeSubscriptions() {
            document.getElementById('subscriptionsModal').style.display = 'none';
        }

        function buySubscription(type) {
            if (type === 'europa') {
                showToast('⭐ Ліга Європи активована! Рейтинг розблоковано', 'success');
            } else if (type === 'champions') {
                showToast('🏆 Ліга Чемпіонів активована! Повний доступ', 'success');
                addCoins(100);
            }
        }

        function buyCoins(amount, price) {
            showToast(`💰 Придбано ${amount} монет за ${price}₴!`, 'success');
            addCoins(amount);
        }

        function showExpertReviews() {
            const reviewContent = `
                <div style="text-align: center; padding: 30px 20px;">
                    <div style="font-size: 60px; margin-bottom: 20px;">🎯</div>
                    <h3 style="color: #2e7d32; margin-bottom: 15px;">Експертні відгуки</h3>
                    <p style="color: #666; font-size: 14px; line-height: 1.5; margin-bottom: 20px;">
                        Отримайте професійний аналіз своєї гри від досвідчених тренерів, скаутів та футбольних зірок.
                    </p>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                        <h4 style="color: #4caf50; margin-bottom: 10px;">Що буде доступно:</h4>
                        <div style="text-align: left; font-size: 13px; color: #666;">
                            • Аналіз техніки від професійних тренерів<br>
                            • Відгуки від скаутів провідних клубів<br>
                            • Персональні поради від футбольних зірок<br>
                            • Детальний розбір ваших відео<br>
                            • Рекомендації для покращення гри
                        </div>
                    </div>
                    <div style="background: linear-gradient(135deg, #4caf50, #66bb6a); color: white; padding: 12px; border-radius: 8px; font-weight: 600;">
                        🚀 Скоро запуск!
                    </div>
                </div>
            `;
            
            let reviewModal = document.getElementById('expertReviewModal');
            if (!reviewModal) {
                reviewModal = document.createElement('div');
                reviewModal.id = 'expertReviewModal';
                reviewModal.className = 'rating-modal';
                reviewModal.innerHTML = `
                    <div class="rating-content" style="max-width: 400px;">
                        <div id="expertReviewContent">${reviewContent}</div>
                        <div class="rating-buttons">
                            <button onclick="closeExpertReview()" class="rating-btn skip">Закрити</button>
                        </div>
                    </div>
                `;
                document.body.appendChild(reviewModal);
            }
            
            reviewModal.classList.add('show');
        }

        function closeExpertReview() {
            document.getElementById('expertReviewModal').classList.remove('show');
        }

        function showSportsGoods() {
            const goodsContent = `
                <div style="text-align: center; padding: 30px 20px;">
                    <div style="font-size: 60px; margin-bottom: 20px;">🛍️</div>
                    <h3 style="color: #2e7d32; margin-bottom: 15px;">Спортивні товари</h3>
                    <p style="color: #666; font-size: 14px; line-height: 1.5; margin-bottom: 20px;">
                        Купуйте якісне футбольне спорядження від наших партнерів зі знижками для користувачів FLAP.
                    </p>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                        <h4 style="color: #ff9800; margin-bottom: 10px;">Що буде доступно:</h4>
                        <div style="text-align: left; font-size: 13px; color: #666;">
                            • Футбольні бутси від топових брендів<br>
                            • Форми та екіпіровка команд<br>
                            • М'ячі та тренувальне обладнання<br>
                            • Аксесуари та захист<br>
                            • Ексклюзивні знижки до 30%
                        </div>
                    </div>
                    <div style="background: linear-gradient(135deg, #ff9800, #ffb74d); color: white; padding: 12px; border-radius: 8px; font-weight: 600;">
                        🚀 Скоро запуск!
                    </div>
                </div>
            `;
            
            let goodsModal = document.getElementById('sportsGoodsModal');
            if (!goodsModal) {
                goodsModal = document.createElement('div');
                goodsModal.id = 'sportsGoodsModal';
                goodsModal.className = 'rating-modal';
                goodsModal.innerHTML = `
                    <div class="rating-content" style="max-width: 400px;">
                        <div id="sportsGoodsContent">${goodsContent}</div>
                        <div class="rating-buttons">
                            <button onclick="closeSportsGoods()" class="rating-btn skip">Закрити</button>
                        </div>
                    </div>
                `;
                document.body.appendChild(goodsModal);
            }
            
            goodsModal.classList.add('show');
        }

        function closeSportsGoods() {
            document.getElementById('sportsGoodsModal').classList.remove('show');
        }

        // Modern auth system
        function switchAuthMode(mode) {
            const loginTab = document.getElementById('loginTab');
            const registerTab = document.getElementById('registerTab');
            const loginForm = document.getElementById('loginForm');
            const registerForm = document.getElementById('registerForm');

            if (mode === 'login') {
                loginTab.style.background = 'linear-gradient(135deg, #4caf50, #66bb6a)';
                loginTab.style.color = 'white';
                registerTab.style.background = 'transparent';
                registerTab.style.color = 'rgba(255,255,255,0.7)';
                loginForm.style.display = 'block';
                registerForm.style.display = 'none';
            } else {
                registerTab.style.background = 'linear-gradient(135deg, #4caf50, #66bb6a)';
                registerTab.style.color = 'white';
                loginTab.style.background = 'transparent';
                loginTab.style.color = 'rgba(255,255,255,0.7)';
                registerForm.style.display = 'block';
                loginForm.style.display = 'none';
            }
        }

        // Profile creation functions
        function previewProfilePhoto(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('profilePhotoPreview').innerHTML = `<img src="${e.target.result}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
                };
                reader.readAsDataURL(file);
            }
        }

        function completeProfileCreation(event) {
            event.preventDefault();
            
            const name = document.getElementById('profileName').value || "Новий Користувач";
            const position = document.getElementById('profilePosition').value || "Півзахисник";
            const city = document.getElementById('profileCity').value || "Київ";
            const phone = document.getElementById('profilePhone').value || "+380501234567";
            const instagram = document.getElementById('profileInstagram').value || "@new_user";
            
            currentUser = {
                name: name,
                position: position,
                city: city,
                rating: 4.0,
                phone: phone,
                instagram: instagram
            };
            
            // Close profile creation modal
            document.getElementById('profileCreationModal').classList.remove('show');
            
            // Hide auth screen and show main screen
            document.getElementById('authScreen').classList.remove('active');
            document.getElementById('mainScreen').classList.add('active');
            
            showToast('🎉 Профіль створено! Ласкаво просимо до FLAP!', 'success');
        }

        function hideAllScreens() {
            document.querySelectorAll('.screen').forEach(screen => {
                screen.classList.remove('active');
            });
        }

        function handleQuickLogin() {
            console.log('🔑 handleQuickLogin викликана');
            
            try {
                currentUser = { name: 'Максим Коваль', avatar: 'МК', rating: 4.8 };
                
                const authScreen = document.getElementById('authScreen');
                const mainScreen = document.getElementById('mainScreen');
                
                console.log('📱 authScreen знайдено:', !!authScreen);
                console.log('📱 mainScreen знайдено:', !!mainScreen);
                
                if (authScreen) {
                    authScreen.style.display = 'none';
                    console.log('✅ authScreen приховано');
                } else {
                    console.error('❌ authScreen не знайдено!');
                    alert('❌ Помилка: authScreen не знайдено!');
                    return;
                }
                
                if (mainScreen) {
                    mainScreen.style.display = 'block';
                    console.log('✅ mainScreen показано');
                } else {
                    console.error('❌ mainScreen не знайдено!');
                    alert('❌ Помилка: mainScreen не знайдено!');
                    return;
                }
                
                // Show success message
                alert('🎉 Успішний вхід в систему!');
                
                // Show welcome subscription offer
                setTimeout(() => {
                    if (typeof showToast === 'function') {
                        showToast('🎉 Даруємо вам тиждень безкоштовного користування підпискою Ліга Чемпіонів!', 'success');
                    }
                }, 1000);
                
            } catch (error) {
                console.error('❌ Помилка в handleQuickLogin:', error);
                alert('❌ Помилка входу: ' + error.message);
            }
        }

        function handleQuickRegister() {
            console.log('📝 handleQuickRegister викликана');
            
            try {
                const profileModal = document.getElementById('profileCreationModal');
                
                if (profileModal) {
                    profileModal.classList.add('show');
                    console.log('✅ Модальне вікно профілю показано');
                } else {
                    console.log('⚠️ Модальне вікно профілю не знайдено, входимо одразу');
                    handleQuickLogin(); // Якщо немає модального вікна, одразу входимо
                }
                
            } catch (error) {
                console.error('❌ Помилка в handleQuickRegister:', error);
                alert('❌ Помилка реєстрації: ' + error.message);
                // Якщо помилка, спробуємо увійти
                handleQuickLogin();
            }
        }

        function loginWithGoogle() {
            currentUser = { name: 'Максим Коваль', avatar: 'МК', rating: 4.8 };
            const authScreen = document.getElementById('authScreen');
            const mainScreen = document.getElementById('mainScreen');
            
            if (authScreen) authScreen.style.display = 'none';
            if (mainScreen) mainScreen.style.display = 'block';
            
            setTimeout(() => {
                showToast('🎉 Даруємо вам тиждень безкоштовного користування підпискою Ліга Чемпіонів!', 'success');
            }, 1000);
        }

        function loginWithFacebook() {
            currentUser = { name: 'Максим Коваль', avatar: 'МК', rating: 4.8 };
            const authScreen = document.getElementById('authScreen');
            const mainScreen = document.getElementById('mainScreen');
            
            if (authScreen) authScreen.style.display = 'none';
            if (mainScreen) mainScreen.style.display = 'block';
            
            setTimeout(() => {
                showToast('🎉 Даруємо вам тиждень безкоштовного користування підпискою Ліга Чемпіонів!', 'success');
            }, 1000);
        }

        // Enhanced showSection function
        function showSection(sectionId) {
            console.log('🔄 showSection called with:', sectionId);
            
            // Hide all sections
            const sections = document.querySelectorAll('.content-section');
            console.log('📋 Found sections:', sections.length);
            sections.forEach(section => {
                section.style.display = 'none';
                section.classList.remove('active');
            });
            
            // Remove active class from all nav tabs
            const navTabs = document.querySelectorAll('.nav-tab');
            navTabs.forEach(tab => tab.classList.remove('active'));
            
            // Show selected section
            const targetSection = document.getElementById(sectionId);
            console.log('🎯 Target section found:', !!targetSection);
            if (targetSection) {
                targetSection.style.display = 'block';
                targetSection.classList.add('active');
                console.log('✅ Section displayed:', sectionId);
            } else {
                console.error('❌ Section not found:', sectionId);
            }
            
            // Add active class to clicked nav tab
            setTimeout(() => {
                const clickedTab = document.querySelector(`.nav-tab[onclick*="${sectionId}"]`);
                if (clickedTab) {
                    clickedTab.classList.add('active');
                    console.log('✅ Tab activated:', sectionId);
                }
            }, 10);
        }

        // Enhanced player profiles with unique data
        const playersDatabase = {
            'player1': { name: 'Андрій Коваленко', avatar: '🎯', city: 'Київ', position: 'Півзахисник', age: 24, rating: 4.1, phone: '+380671234567', telegram: '@andriy_koval', instagram: '@andriy_football' },
            'player2': { name: 'Петро Мельник', avatar: '⚽', city: 'Львів', position: 'Нападник', age: 26, rating: 4.2, phone: '+380502345678', telegram: '@petro_mel', instagram: '@petro_striker' },
            'player3': { name: 'Дмитро Коваленко', avatar: '⚡', city: 'Одеса', position: 'Воротар', age: 23, rating: 3.8, phone: '+380633456789', telegram: '@dmytro_gk', instagram: '@dmytro_keeper' },
            'player4': { name: 'Олексій Шевченко', avatar: '🏃', city: 'Харків', position: 'Воротар', age: 25, rating: 4.5, phone: '+380954567890', telegram: '@alex_shev', instagram: '@alex_goalkeeper' },
            'player5': { name: 'Максим Зінченко', avatar: '🛡️', city: 'Дніпро', position: 'Півзахисник', age: 27, rating: 3.7, phone: '+380675678901', telegram: '@max_zin', instagram: '@max_midfielder' },
            'player6': { name: 'Віктор Шевченко', avatar: '🥅', city: 'Київ', position: 'Захисник', age: 28, rating: 4.0, phone: '+380506789012', telegram: '@viktor_def', instagram: '@viktor_defense' },
            'player7': { name: 'Олександр Мельник', avatar: '🔥', city: 'Львів', position: 'Нападник', age: 22, rating: 4.3, phone: '+380637890123', telegram: '@alex_mel', instagram: '@alex_forward' }
        };



        // Create Video Functions
        function showCreateVideo() {
            document.getElementById('createVideoModal').style.display = 'flex';
        }

        function closeCreateVideo() {
            document.getElementById('createVideoModal').style.display = 'none';
        }

        function submitVideo(event) {
            event.preventDefault();
            addCoins(5); // +5 coins for creating video
            showToast('🎉 Відео успішно опубліковано! +5 монет', 'success');
            closeCreateVideo();
        }

        // Apply Video Filters Function
        function applyVideoFilters() {
            const city = document.getElementById('cityFilter').value;
            const category = document.getElementById('categoryFilter').value;
            const rating = document.getElementById('ratingFilter').value;
            
            let message = 'Фільтри застосовано: ';
            if (city) message += `Місто: ${city} `;
            if (category) message += `Категорія: ${category} `;
            if (rating) message += `Рейтинг: ${rating}+ `;
            
            showToast(message || 'Показано всі відео', 'info');
        }

        // Modal close function
        function closeModal(modalId) {
            document.getElementById(modalId).style.display = 'none';
        }

        // Copy to clipboard function
        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                showToast('📋 Скопійовано!', 'success');
            });
        }

